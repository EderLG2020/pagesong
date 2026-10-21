const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' })

export const formatPrice = (value: number) => currency.format(value)

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
