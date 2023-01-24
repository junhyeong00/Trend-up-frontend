import numberFormat from './NumberFormat';

export default function optionPriceFormat(optionPrice) {
  if (!optionPrice) {
    return '';
  }

  return `( + ${numberFormat(optionPrice)}원)`;
}
