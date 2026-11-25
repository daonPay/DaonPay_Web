import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="text-5xl font-black text-brand">404</p>
      <h1 className="mt-4 text-xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="mt-2 text-sub">주소가 바뀌었거나 없는 페이지예요.</p>
      <Button to="/" className="mt-6">
        홈으로 가기
      </Button>
    </div>
  )
}
