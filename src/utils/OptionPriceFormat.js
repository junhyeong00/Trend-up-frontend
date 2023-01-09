import numberFormat from './NumberFormat';

export default function OptionPriceFormat(optionPrice) {
  if (!optionPrice) {
    return '';
  }

  return `( + ${numberFormat(optionPrice)}원)`;
}
