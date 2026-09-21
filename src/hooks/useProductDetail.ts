import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productApi } from '@/apis/product.api'
import type { Product, ProductDetail, ProductVariantOption } from '@/types/customer/product.type'
import { cartStore } from '@/stores/cartStore'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'

export function useProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, openLoginModal } = useAuth()
  const { success, info } = useToast()

  const [loading, setLoading] = useState(true)
  const [productData, setProductData] = useState<{ product: Product; detail: ProductDetail } | null>(null)
  const [selectedVariantOptions, setSelectedVariantOptions] = useState<Record<string, ProductVariantOption>>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!slug) return

    let isMounted = true

    const fetchProductDetail = async () => {
      setLoading(true)
      const res = await productApi.getProductDetailBySlug(slug)
      if (!isMounted) return

      if (res.success && res.data) {
        setProductData(res.data)

        // Initialize default selected variant options
        const initialOptions: Record<string, ProductVariantOption> = {}
        res.data.detail.variantGroups?.forEach((group) => {
          if (group.options.length > 0) {
            initialOptions[group.id] = group.options[0]
          }
        })
        setSelectedVariantOptions(initialOptions)
      } else {
        setProductData(null)
      }
      setLoading(false)
    }

    fetchProductDetail()

    return () => {
      isMounted = false
    }
  }, [slug])

  const showToast = useCallback((message: string) => {
    info(message)
  }, [info])

  // Resolve current price, SKU, and stock based on selected variant options
  const resolveVariantDetails = useCallback(() => {
    if (!productData) return { price: 0, sku: '', stock: 0 }
    let price = productData.product.price
    let sku = productData.detail.sku
    let stock = productData.detail.stockQuantity

    Object.values(selectedVariantOptions).forEach((opt) => {
      if (opt.price) price = opt.price
      if (opt.sku) sku = opt.sku
      if (opt.stock !== undefined) stock = opt.stock
    })

    return { price, sku, stock }
  }, [productData, selectedVariantOptions])

  const handleSelectVariantOption = useCallback((groupId: string, option: ProductVariantOption) => {
    setSelectedVariantOptions((prev) => ({
      ...prev,
      [groupId]: option,
    }))
  }, [])

  const handleAddToCart = useCallback(
    (quantity: number) => {
      if (!productData) return
      const { price } = resolveVariantDetails()

      const productToAdd: Product = {
        ...productData.product,
        price,
      }

      cartStore.addItem(productToAdd, quantity)
      success(`Đã thêm ${quantity} x ${productData.product.name} vào giỏ hàng thành công!`)
    },
    [productData, resolveVariantDetails, success]
  )

  const handleBuyNow = useCallback(
    (quantity: number) => {
      if (!productData) return

      if (!isAuthenticated) {
        showToast('Vui lòng đăng nhập để tiến hành mua ngay!')
        openLoginModal()
        return
      }

      const { price } = resolveVariantDetails()

      const productToAdd: Product = {
        ...productData.product,
        price,
      }

      cartStore.addItem(productToAdd, quantity)
      cartStore.openDrawer()
    },
    [productData, isAuthenticated, resolveVariantDetails, showToast, openLoginModal]
  )

  const { price: currentPrice, sku: currentSku, stock: currentStock } = resolveVariantDetails()

  return {
    loading,
    productData,
    selectedVariantOptions,
    currentPrice,
    currentSku,
    currentStock,
    handleSelectVariantOption,
    handleAddToCart,
    handleBuyNow,
    showToast,
    navigate,
  }
}
