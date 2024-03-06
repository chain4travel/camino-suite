export interface PartnerDataType {
    id?: number
    attributes?: AttributesType
}

export interface AttributesType {
    contactEmail?: string
    companyName?: string
    companyCountry?: string
    companyWebsite?: string
    contactFirstname?: string
    contactLastname?: string
    contactPhone?: string
    companyShortDescription?: string
    companyLongDescription?: string
    isConsortiumMember?: boolean
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    logoBox?: string
    companyLinkedin?: string
    companyTwitter?: string
    companyLogoColor?: CompanyLogoColorType
    business_fields?: BusinessFieldsType
    company_size?: CompanySizeType
    companyLogoDark?: CompanyLogoDarkType
    companyLogoLight?: CompanyLogoLightType
    country_flag?: CountryFlagType
}

export interface CompanyLogoColorType {
    data?: LogoDataType
}

export interface LogoDataType {
    id?: number
    attributes?: LogoAttributesType
}

export interface LogoAttributesType {
    name?: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    formats?: FormatsType
    hash?: string
    ext?: string
    mime?: string
    size?: number
    url?: string
    previewUrl?: string
    provider?: string
    provider_metadata?: string
    createdAt?: string
    updatedAt?: string
}

export interface FormatsType {
    large?: FormatDetailType
    small?: FormatDetailType
    medium?: FormatDetailType
    thumbnail?: FormatDetailType
}

export interface FormatDetailType {
    ext?: string
    url?: string
    hash?: string
    mime?: string
    name?: string
    path?: string
    size?: number
    width?: number
    height?: number
}

export interface BusinessFieldsType {
    data?: BusinessFieldType[]
}

export interface BusinessFieldType {
    id?: number
    attributes?: BusinessFieldAttributesType
}

export interface BusinessFieldAttributesType {
    BusinessField?: string
    createdAt?: string
    updatedAt?: string
}

export interface CompanySizeType {
    data?: CompanySizeDataType
}

export interface CompanySizeDataType {
    id?: number
    attributes?: CompanySizeAttributesType
}

export interface CompanySizeAttributesType {
    companyNumberOfEmployees?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export interface CompanyLogoDarkType {
    data?: LogoDataType
}

export interface CompanyLogoLightType {
    data?: LogoDataType
}

export interface CountryFlagType {
    data?: CountryFlagDataType
}

export interface CountryFlagDataType {
    id?: number
    attributes?: CountryFlagAttributesType
}

export interface CountryFlagAttributesType {
    countryIdentifier?: string
    countryName?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export interface PartnersResponseType {
    data?: PartnerDataType[]
    meta?: MetaType
}

export interface MetaType {
    pagination?: PaginationType
}

export interface PaginationType {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
