/**
 * Types and Matrix Data for CreatorPay
 */

export type PlatformType = 'youtube' | 'tiktok';
export type VideoFormatType = 'long' | 'short';

export type NicheType = 'finance' | 'tech' | 'lifestyle' | 'entertainment' | 'gaming';

export interface NicheConfig {
  id: NicheType;
  label: string;
  sublabel: string;
  icon: string; // lucide icon name
  rpm: {
    youtube: {
      long: number;
      short: number;
    };
    tiktok: {
      long: number;
      short: number;
    };
  };
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number;          // USD to local currency rate (e.g. 1 USD = 0.92 EUR)
  rpmMultiplier: number; // Regional market RPM index coefficient
}

export const COUNTRY_LIST: CountryConfig[] = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', currency: 'AFN', symbol: '؋', rate: 70.5, rpmMultiplier: 0.05 },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', currency: 'ALL', symbol: 'L', rate: 92.5, rpmMultiplier: 0.25 },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', currency: 'DZD', symbol: 'د.ج', rate: 134.5, rpmMultiplier: 0.15 },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.85 },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', currency: 'AOA', symbol: 'Kz', rate: 850.0, rpmMultiplier: 0.10 },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.45 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS', symbol: '$', rate: 915.0, rpmMultiplier: 0.30 },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', currency: 'AMD', symbol: '֏', rate: 388.0, rpmMultiplier: 0.25 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', rate: 1.49, rpmMultiplier: 0.84 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.88 },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', currency: 'AZN', symbol: '₼', rate: 1.70, rpmMultiplier: 0.25 },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', currency: 'BSD', symbol: '$', rate: 1.00, rpmMultiplier: 0.60 },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', currency: 'BHD', symbol: '.د.ب', rate: 0.38, rpmMultiplier: 0.75 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', symbol: '৳', rate: 117.5, rpmMultiplier: 0.12 },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', currency: 'BBD', symbol: '$', rate: 2.00, rpmMultiplier: 0.55 },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', currency: 'BYN', symbol: 'Br', rate: 3.28, rpmMultiplier: 0.20 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.87 },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', currency: 'BZD', symbol: '$', rate: 2.00, rpmMultiplier: 0.30 },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.10 },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', currency: 'BTN', symbol: 'Nu.', rate: 83.5, rpmMultiplier: 0.12 },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', currency: 'BOB', symbol: 'Bs', rate: 6.91, rpmMultiplier: 0.18 },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', currency: 'BAM', symbol: 'KM', rate: 1.80, rpmMultiplier: 0.25 },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', currency: 'BWP', symbol: 'P', rate: 13.5, rpmMultiplier: 0.30 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', symbol: 'R$', rate: 5.50, rpmMultiplier: 0.32 },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', currency: 'BND', symbol: 'B$', rate: 1.35, rpmMultiplier: 0.65 },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', currency: 'BGN', symbol: 'лв', rate: 1.80, rpmMultiplier: 0.45 },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.08 },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', currency: 'BIF', symbol: 'FBu', rate: 2850.0, rpmMultiplier: 0.05 },
  { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻', currency: 'CVE', symbol: 'Esc', rate: 101.5, rpmMultiplier: 0.18 },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', currency: 'KHR', symbol: '៛', rate: 4100.0, rpmMultiplier: 0.15 },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.12 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$', rate: 1.36, rpmMultiplier: 0.82 },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.05 },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.05 },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', currency: 'CLP', symbol: '$', rate: 930.0, rpmMultiplier: 0.45 },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', symbol: '¥', rate: 7.25, rpmMultiplier: 0.50 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', currency: 'COP', symbol: '$', rate: 4150.0, rpmMultiplier: 0.28 },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', currency: 'KMF', symbol: 'CF', rate: 450.0, rpmMultiplier: 0.08 },
  { code: 'CD', name: 'Congo, Democratic Republic of the', flag: '🇨🇩', currency: 'CDF', symbol: 'FC', rate: 2800.0, rpmMultiplier: 0.08 },
  { code: 'CG', name: 'Congo, Republic of the', flag: '🇨🇬', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.10 },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', currency: 'CRC', symbol: '₡', rate: 525.0, rpmMultiplier: 0.40 },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.15 },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.55 },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', currency: 'CUP', symbol: '$', rate: 24.0, rpmMultiplier: 0.10 },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.65 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', currency: 'CZK', symbol: 'Kč', rate: 23.1, rpmMultiplier: 0.58 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', currency: 'DKK', symbol: 'kr', rate: 6.88, rpmMultiplier: 0.90 },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', currency: 'DJF', symbol: 'Fdj', rate: 177.7, rpmMultiplier: 0.12 },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.35 },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', currency: 'DOP', symbol: 'RD$', rate: 59.0, rpmMultiplier: 0.30 },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.25 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currency: 'EGP', symbol: 'E£', rate: 47.8, rpmMultiplier: 0.15 },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.25 },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.15 },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', currency: 'ERN', symbol: 'Nfk', rate: 15.0, rpmMultiplier: 0.05 },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.60 },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', currency: 'SZL', symbol: 'L', rate: 18.5, rpmMultiplier: 0.20 },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', currency: 'ETB', symbol: 'Br', rate: 57.5, rpmMultiplier: 0.10 },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', currency: 'FJD', symbol: '$', rate: 2.24, rpmMultiplier: 0.25 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.86 },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.85 },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', currency: 'XAF', symbol: 'FCFA', rate: 605.0, rpmMultiplier: 0.20 },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', currency: 'GMD', symbol: 'D', rate: 68.0, rpmMultiplier: 0.08 },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', currency: 'GEL', symbol: '₾', rate: 2.72, rpmMultiplier: 0.25 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.90 },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', symbol: '₵', rate: 14.8, rpmMultiplier: 0.15 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.55 },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.35 },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', currency: 'GTQ', symbol: 'Q', rate: 7.78, rpmMultiplier: 0.25 },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', currency: 'GNF', symbol: 'FG', rate: 8600.0, rpmMultiplier: 0.08 },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.08 },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', currency: 'GYD', symbol: '$', rate: 209.0, rpmMultiplier: 0.22 },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', currency: 'HTG', symbol: 'G', rate: 132.5, rpmMultiplier: 0.08 },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', currency: 'HNL', symbol: 'L', rate: 24.7, rpmMultiplier: 0.22 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', currency: 'HUF', symbol: 'Ft', rate: 365.0, rpmMultiplier: 0.48 },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', currency: 'ISK', symbol: 'kr', rate: 138.0, rpmMultiplier: 0.80 },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 83.5, rpmMultiplier: 0.28 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', symbol: 'Rp', rate: 16350.0, rpmMultiplier: 0.22 },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', currency: 'IRR', symbol: '﷼', rate: 42000.0, rpmMultiplier: 0.10 },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', currency: 'IQD', symbol: 'ع.د', rate: 1310.0, rpmMultiplier: 0.15 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.89 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', currency: 'ILS', symbol: '₪', rate: 3.72, rpmMultiplier: 0.78 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.68 },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', currency: 'JMD', symbol: 'J$', rate: 156.0, rpmMultiplier: 0.28 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥', rate: 158.5, rpmMultiplier: 0.75 },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', currency: 'JOD', symbol: 'JD', rate: 0.71, rpmMultiplier: 0.35 },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', currency: 'KZT', symbol: '₸', rate: 460.0, rpmMultiplier: 0.30 },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', symbol: 'KSh', rate: 129.0, rpmMultiplier: 0.15 },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', currency: 'AUD', symbol: '$', rate: 1.49, rpmMultiplier: 0.15 },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.22 },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currency: 'KWD', symbol: 'KD', rate: 0.31, rpmMultiplier: 0.78 },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', currency: 'KGS', symbol: 'сом', rate: 87.5, rpmMultiplier: 0.18 },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', currency: 'LAK', symbol: '₭', rate: 21800.0, rpmMultiplier: 0.12 },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.52 },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', currency: 'LBP', symbol: 'ل.ل', rate: 89500.0, rpmMultiplier: 0.18 },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', currency: 'LSL', symbol: 'L', rate: 18.5, rpmMultiplier: 0.15 },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', currency: 'LRD', symbol: '$', rate: 194.0, rpmMultiplier: 0.08 },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', currency: 'LYD', symbol: 'ل.د', rate: 4.85, rpmMultiplier: 0.18 },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', currency: 'CHF', symbol: 'CHF', rate: 0.89, rpmMultiplier: 0.95 },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.54 },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.92 },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', currency: 'MGA', symbol: 'Ar', rate: 4500.0, rpmMultiplier: 0.08 },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', currency: 'MWK', symbol: 'MK', rate: 1730.0, rpmMultiplier: 0.08 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', symbol: 'RM', rate: 4.72, rpmMultiplier: 0.38 },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', currency: 'MVR', symbol: 'Rf', rate: 15.4, rpmMultiplier: 0.35 },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.08 },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.70 },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.15 },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', currency: 'MRU', symbol: 'UM', rate: 39.6, rpmMultiplier: 0.10 },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', currency: 'MUR', symbol: '₨', rate: 46.5, rpmMultiplier: 0.35 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', symbol: '$', rate: 18.4, rpmMultiplier: 0.42 },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.15 },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', currency: 'MDL', symbol: 'L', rate: 17.8, rpmMultiplier: 0.25 },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.90 },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', currency: 'MNT', symbol: '₮', rate: 3450.0, rpmMultiplier: 0.20 },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.35 },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', currency: 'MAD', symbol: 'د.م.', rate: 10.0, rpmMultiplier: 0.22 },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', currency: 'MZN', symbol: 'MT', rate: 63.8, rpmMultiplier: 0.10 },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', currency: 'MMK', symbol: 'K', rate: 2100.0, rpmMultiplier: 0.12 },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', currency: 'NAD', symbol: '$', rate: 18.5, rpmMultiplier: 0.28 },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', currency: 'AUD', symbol: '$', rate: 1.49, rpmMultiplier: 0.15 },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', currency: 'NPR', symbol: '₨', rate: 133.5, rpmMultiplier: 0.12 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.89 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', symbol: 'NZ$', rate: 1.63, rpmMultiplier: 0.80 },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', currency: 'NIO', symbol: 'C$', rate: 36.8, rpmMultiplier: 0.20 },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.08 },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦', rate: 1500.0, rpmMultiplier: 0.12 },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', currency: 'KPW', symbol: '₩', rate: 900.0, rpmMultiplier: 0.05 },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', currency: 'MKD', symbol: 'ден', rate: 56.8, rpmMultiplier: 0.25 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'NOK', symbol: 'kr', rate: 10.6, rpmMultiplier: 0.95 },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', currency: 'OMR', symbol: 'r.o.', rate: 0.38, rpmMultiplier: 0.68 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', symbol: '₨', rate: 278.5, rpmMultiplier: 0.15 },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.18 },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', currency: 'ILS', symbol: '₪', rate: 3.72, rpmMultiplier: 0.15 },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', currency: 'PAB', symbol: 'B/.', rate: 1.00, rpmMultiplier: 0.45 },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', currency: 'PGK', symbol: 'K', rate: 3.90, rpmMultiplier: 0.15 },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', currency: 'PYG', symbol: '₲', rate: 7500.0, rpmMultiplier: 0.22 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', currency: 'PEN', symbol: 'S/.', rate: 3.80, rpmMultiplier: 0.28 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', symbol: '₱', rate: 58.8, rpmMultiplier: 0.20 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN', symbol: 'zł', rate: 4.02, rpmMultiplier: 0.50 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.65 },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'QAR', symbol: 'QR', rate: 3.64, rpmMultiplier: 0.80 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', currency: 'RON', symbol: 'lei', rate: 4.60, rpmMultiplier: 0.42 },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', currency: 'RUB', symbol: '₽', rate: 88.0, rpmMultiplier: 0.35 },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', currency: 'RWF', symbol: 'FRw', rate: 1310.0, rpmMultiplier: 0.12 },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.40 },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.40 },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', currency: 'XCD', symbol: '$', rate: 2.70, rpmMultiplier: 0.35 },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', currency: 'WST', symbol: 'T', rate: 2.70, rpmMultiplier: 0.18 },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.80 },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹', currency: 'STN', symbol: 'Db', rate: 22.5, rpmMultiplier: 0.10 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'SR', rate: 3.75, rpmMultiplier: 0.70 },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.12 },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', currency: 'RSD', symbol: 'din', rate: 108.0, rpmMultiplier: 0.32 },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', currency: 'SCR', symbol: '₨', rate: 13.5, rpmMultiplier: 0.35 },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', currency: 'SLE', symbol: 'Le', rate: 22.5, rpmMultiplier: 0.05 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$', rate: 1.35, rpmMultiplier: 0.92 },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.58 },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.60 },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', currency: 'SBD', symbol: '$', rate: 8.50, rpmMultiplier: 0.12 },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', currency: 'SOS', symbol: 'Sh', rate: 570.0, rpmMultiplier: 0.05 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', symbol: 'R', rate: 18.2, rpmMultiplier: 0.40 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', symbol: '₩', rate: 1380.0, rpmMultiplier: 0.72 },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', currency: 'SSP', symbol: '£', rate: 130.0, rpmMultiplier: 0.05 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.65 },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', currency: 'LKR', symbol: '₨', rate: 302.0, rpmMultiplier: 0.18 },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', currency: 'SDG', symbol: '£SD', rate: 600.0, rpmMultiplier: 0.05 },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', currency: 'SRD', symbol: '$', rate: 31.2, rpmMultiplier: 0.20 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', symbol: 'kr', rate: 10.5, rpmMultiplier: 0.88 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', symbol: 'CHF', rate: 0.89, rpmMultiplier: 1.00 },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', currency: 'SYP', symbol: '£S', rate: 13000.0, rpmMultiplier: 0.05 },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', currency: 'TWD', symbol: 'NT$', rate: 32.4, rpmMultiplier: 0.65 },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', currency: 'TJS', symbol: 'ЅМ', rate: 10.7, rpmMultiplier: 0.12 },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', symbol: 'TSh', rate: 2600.0, rpmMultiplier: 0.15 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currency: 'THB', symbol: '฿', rate: 36.7, rpmMultiplier: 0.28 },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 0.15 },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', currency: 'XOF', symbol: 'CFA', rate: 605.0, rpmMultiplier: 0.08 },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', currency: 'TOP', symbol: 'T$', rate: 2.35, rpmMultiplier: 0.18 },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', currency: 'TTD', symbol: 'TT$', rate: 6.75, rpmMultiplier: 0.35 },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', currency: 'TND', symbol: 'DT', rate: 3.12, rpmMultiplier: 0.20 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', symbol: '₺', rate: 32.8, rpmMultiplier: 0.35 },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', currency: 'TMT', symbol: 'T', rate: 3.50, rpmMultiplier: 0.15 },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', currency: 'AUD', symbol: '$', rate: 1.49, rpmMultiplier: 0.15 },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX', symbol: 'USh', rate: 3750.0, rpmMultiplier: 0.12 },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', currency: 'UAH', symbol: '₴', rate: 40.5, rpmMultiplier: 0.25 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', symbol: 'د.إ', rate: 3.67, rpmMultiplier: 0.78 },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 0.78, rpmMultiplier: 0.88 },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 1.00, rpmMultiplier: 1.00 },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', currency: 'UYU', symbol: '$U', rate: 39.2, rpmMultiplier: 0.35 },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', currency: 'UZS', symbol: "so'm", rate: 12600.0, rpmMultiplier: 0.18 },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', currency: 'VUV', symbol: 'VT', rate: 118.0, rpmMultiplier: 0.15 },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', currency: 'EUR', symbol: '€', rate: 0.92, rpmMultiplier: 0.80 },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', currency: 'VES', symbol: 'Bs.S', rate: 36.4, rpmMultiplier: 0.10 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', currency: 'VND', symbol: '₫', rate: 25450.0, rpmMultiplier: 0.18 },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', currency: 'YER', symbol: '﷼', rate: 250.0, rpmMultiplier: 0.05 },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', currency: 'ZMW', symbol: 'ZK', rate: 25.5, rpmMultiplier: 0.12 },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', currency: 'ZWG', symbol: 'ZiG', rate: 13.5, rpmMultiplier: 0.10 }
];

export const NICHE_LIST: NicheConfig[] = [
  {
    id: 'finance',
    label: 'Finance & Business',
    sublabel: 'Investing, personal finance, crypto, SaaS, careers',
    icon: 'TrendingUp',
    rpm: {
      youtube: { long: 9.50, short: 0.15 },
      tiktok: { long: 1.10, short: 0.00 }
    }
  },
  {
    id: 'tech',
    label: 'Tech & Gadgets',
    sublabel: 'Hardware, software development, AI, smartphone reviews',
    icon: 'Cpu',
    rpm: {
      youtube: { long: 5.50, short: 0.09 },
      tiktok: { long: 0.85, short: 0.00 }
    }
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Vlogging',
    sublabel: 'Travel, food, daily logs, fashion, beauty, wellness',
    icon: 'Heart',
    rpm: {
      youtube: { long: 2.50, short: 0.05 },
      tiktok: { long: 0.60, short: 0.00 }
    }
  },
  {
    id: 'entertainment',
    label: 'Entertainment & Comedy',
    sublabel: 'Skits, reaction videos, pop culture, movies, storytelling',
    icon: 'Sparkles',
    rpm: {
      youtube: { long: 1.50, short: 0.03 },
      tiktok: { long: 0.45, short: 0.00 }
    }
  },
  {
    id: 'gaming',
    label: 'Gaming',
    sublabel: 'Let\'s plays, speedruns, game reviews, esports walkthroughs',
    icon: 'Gamepad2',
    rpm: {
      youtube: { long: 0.90, short: 0.02 },
      tiktok: { long: 0.30, short: 0.00 }
    }
  }
];
