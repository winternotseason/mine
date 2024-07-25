// 숫자를 원화(KRW)로 포맷하는 함수
export function formatToKRW(amount: number) {
  return new Intl.NumberFormat("ko-KR").format(amount);
}
