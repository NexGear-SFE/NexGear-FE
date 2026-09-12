export type WarrantyProvider = {
  id: string;
  name: string;
  pageName: string;
  url: string;
  active: boolean;
  color: string;
  bg: string;
};

export const INITIAL_WARRANTY_PROVIDERS: WarrantyProvider[] = [
  {
    id: "asus",
    name: "ASUS",
    pageName: "Warranty Status Inquiry",
    url: "https://www.asus.com/support/warranty-status-inquiry/",
    active: true,
    color: "#00AEEF",
    bg: "rgba(0,174,239,0.08)",
  },
  {
    id: "acer",
    name: "Acer",
    pageName: "Warranty Validation",
    url: "https://apn.acer.co.in/Acer/WarrantyValidation",
    active: true,
    color: "#83B81A",
    bg: "rgba(131,184,26,0.08)",
  },
  {
    id: "msi",
    name: "MSI",
    pageName: "Warranty / Service",
    url: "https://account.msi.com/en/services/warranty-book",
    active: true,
    color: "#E30019",
    bg: "rgba(227,0,25,0.08)",
  },
  {
    id: "dell",
    name: "Dell",
    pageName: "Warranty & Support",
    url: "https://www.dell.com/support/contractservices/en-vn/",
    active: true,
    color: "#007DB8",
    bg: "rgba(0,125,184,0.08)",
  },
];
