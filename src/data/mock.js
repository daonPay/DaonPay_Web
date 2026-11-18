// 화면 확인용 가상 데이터. 백엔드가 준비되면 swagger.yaml의 API 응답으로 교체하세요.
//   예) 지원금 → GET /matches/me, /applications/me · 카드 → GET /wallets/me, /payments/me
//       가맹점 → GET /merchants · 알림 → GET /notifications/me

export const user = {
  name: '김새싹',
  maskedName: '김*싹',
  phone: '010-****-1234',
  region: '새싹시 푸른구 ○○동',
  regionShort: '새싹시 푸른구',
}

/* ---------------- 홈 ---------------- */
export const disaster = {
  title: '2026년 집중호우 침수 피해',
  region: '새싹시 푸른구 (가상 예시)',
  levels: ['관심', '주의', '경계', '심각'],
  currentLevel: 2, // 0부터 시작 → '경계'
  summary: '현재 피해 단계: 경계 — 주택 일부 침수가 확인되어 우선 지원 대상을 검토 중이에요.',
  notice: '※ 안심뱅크 안내용 표시이며, 공식 재난 경보·개인별 피해 판정과 다를 수 있어요. 금액은 예시 데이터예요.',
}

export const STATUS = {
  paid: { label: '지급 완료', tone: 'ok' },
  review: { label: '심사 중', tone: 'warn' },
  required: { label: '신청 필요', tone: 'danger' },
}

export const supports = [
  {
    id: 'housing',
    icon: 'home',
    title: '주택 피해 지원금',
    status: 'paid',
    amount: 3200000,
    amountNote: '',
    desc: '주택 침수 피해가 확인되어 지급이 끝났어요. (2026.10.12 지급)',
    action: { label: '상세 내역 보기', variant: 'outline', to: '/my' },
  },
  {
    id: 'injury',
    icon: 'heart',
    title: '인명 피해 지원금',
    status: 'review',
    amount: 1500000,
    amountNote: '예정',
    desc: '제출하신 서류를 심사하고 있어요. 결과는 알림으로 알려드려요.',
    action: { label: '진행 상황 확인', variant: 'outline', to: '/my' },
  },
  {
    id: 'living',
    icon: 'wallet',
    title: '생계 지원금',
    status: 'required',
    amount: 800000,
    amountNote: '예상',
    desc: '신청 기한 안에 신청해야 받을 수 있어요. (기한: 2026.11.30)',
    action: { label: '신청하러 가기', variant: 'primary', to: '/my' },
  },
]

export const benefits = [
  { icon: 'bolt', title: '공공요금 감면 확인하기', desc: '전기·가스·수도 요금 감면 제도를 확인해요.' },
  { icon: 'bank', title: '세제 지원 확인하기', desc: '세금 납부 유예 등 재난 피해 세제 지원을 확인해요.' },
  { icon: 'wallet', title: '금융 지원 확인하기', desc: '대출 상환 유예, 긴급 금융 지원을 확인해요.' },
]

export const nearbyMerchants = [
  { id: 'm1', name: '푸른마트 새싹점', meta: '식료품·생필품 · 350m', x: 0.5, y: 0.2 },
  { id: 'm2', name: '행복약국', meta: '약국 · 520m', x: 0.2, y: 0.55 },
]

export const nearbyShelters = [
  { id: 's1', name: '새싹초등학교 체육관', meta: '푸른구 새싹로 12 · 420m', capacity: '수용 150명 · 여유 있음 (예시)', x: 0.74, y: 0.25 },
  { id: 's2', name: '푸른구민회관', meta: '푸른구 중앙로 45 · 900m', capacity: '수용 300명 · 운영 여부 확인 필요 (예시)', x: 0.4, y: 0.82 },
]

/* ---------------- 내 정보 ---------------- */
export const reportStatus = [
  { label: '재난 피해 신고', status: { label: '접수 완료', tone: 'ok' } },
  { label: '본인 인증', status: { label: '인증 완료', tone: 'ok' } },
  { label: '지원 대상 확인', status: { label: '확인 중', tone: 'warn' } },
]

export const applications = [
  { name: '주택 피해 지원금', status: { label: '신청 완료', tone: 'ok' }, info: '2026.10.08 신청 · 10.12 지급', action: { label: '상세', variant: 'outline' } },
  { name: '인명 피해 지원금', status: { label: '심사 중', tone: 'warn' }, info: '서류 심사 중', action: { label: '상세', variant: 'outline' } },
  { name: '생계 지원금', status: { label: '신청 필요', tone: 'danger' }, info: '기한 2026.11.30', action: { label: '신청하기', variant: 'primary' } },
  { name: '공공요금 감면', status: { label: '서류 필요', tone: 'danger' }, info: '진단서 사본 1건 제출', action: { label: '서류 제출', variant: 'primary' } },
  { name: '세제·금융 지원', status: null, statusText: '아직 확인하지 않음', info: '자격 확인이 필요해요', action: { label: '확인하기', variant: 'outline' } },
]

export const notices = [
  { title: '카드 발급 절차 업데이트', date: '2026.11.01' },
  { title: '알림 설정 업데이트', date: '2026.11.01' },
  { title: '고객센터 오픈', date: '2026.11.02' },
]

/* ---------------- 고객센터 ---------------- */
export const quickQuestions = [
  '내가 받을 수 있는 지원 확인하기',
  '지원 자격 질문하기',
  '어려운 제도 쉽게 설명받기',
  '신청 절차 안내받기',
  '필요한 서류 확인하기',
  '현재 신청 상태 확인하기',
]

export const easyTools = [
  { icon: 'mic', label: '음성 안내 시작' },
  { icon: 'type', label: '큰 글씨 모드' },
  { icon: 'eye', label: '쉬운 설명으로 보기' },
  { icon: 'list', label: '단계별 안내' },
]

export const supportMenu = [
  { icon: 'help', label: '자주 묻는 질문' },
  { icon: 'card', label: '지원금 지급 문의' },
  { icon: 'file', label: '신청 및 서류 문의' },
  { icon: 'card', label: '카드 및 결제 문의' },
  { icon: 'navigation', label: '가맹점 이용 문의' },
  { icon: 'message', label: '상담 요청' },
  { icon: 'bell', label: '공지사항' },
]

export const inquiries = [
  { title: '생계 지원금 신청 서류가 궁금해요', date: '2026.10.26', status: { label: '답변 대기', tone: 'warn' } },
  { title: '카드 QR 결제가 안 돼요', date: '2026.10.21', status: { label: '답변 완료', tone: 'ok' } },
]

/* ---------------- 카드 ---------------- */
export const wallet = {
  name: '재난지원금 카드 (디지털)',
  balance: 2180000,
  totalPaid: 3200000,
  totalUsed: 1020000,
  expires: '2027.04.30',
}

export const qrSteps = [
  '사용처 확인 — 허용된 가맹점인지 먼저 확인해요.',
  'QR 보여주기 또는 스캔',
  '금액·잔액 확인 후 결제',
]

export const allowedCategories = ['식료품', '약국·의료', '생활용품', '대중교통', '주거 수리']
export const blockedCategories = ['유흥·사행', '고가 사치품', '온라인 상품권', '해외 결제']

export const transactions = [
  { date: '2026.10.27', merchant: '푸른마트 새싹점', amount: -48300, status: 'done', change: '₩2,228,300 → ₩2,180,000' },
  { date: '2026.10.25', merchant: '행복약국', amount: -12500, status: 'done', change: '₩2,240,800 → ₩2,228,300' },
  { date: '2026.10.23', merchant: '새싹 편의점', amount: -9200, status: 'done', change: '₩2,250,000 → ₩2,240,800' },
  { date: '2026.10.19', merchant: '온라인 상품권몰', amount: 0, status: 'blocked', change: '제한 업종 · 변화 없음' },
]

/* ---------------- 화이트리스트 (대구 예시) ---------------- */
export const places = [
  {
    id: 'p1', name: '새싹마트', type: '가맹점', status: '영업 중',
    hours: '08:00–22:00', distance: '250m', walk: '도보 4분', items: ['식료품', '생활용품'],
    address: '대구 중구 동성로 12', phone: '053-000-1234',
  },
  {
    id: 'p2', name: '다온약국', type: '가맹점', status: '영업 중',
    hours: '24시간 운영', distance: '400m', walk: '도보 6분', items: ['의약품', '의료용품'],
    address: '대구 중구 중앙대로 88', phone: '053-000-2345',
  },
  {
    id: 'p3', name: '다온초등학교', type: '대피소', status: '수용 가능',
    hours: '잔여 120명', distance: '500m', walk: '도보 7분', items: ['숙박', '급식'],
    address: '대구 중구 달구벌대로 2100', phone: '053-000-3456',
  },
  {
    id: 'p4', name: '새싹편의점', type: '가맹점', status: '영업 중',
    hours: '24시간 운영', distance: '600m', walk: '도보 9분', items: ['식료품', '생활용품'],
    address: '대구 중구 국채보상로 560', phone: '053-000-4567',
  },
  {
    id: 'p5', name: '다온주민센터', type: '대피소', status: '수용 가능',
    hours: '잔여 80명', distance: '750m', walk: '도보 11분', items: ['숙박', '급식'],
    address: '대구 중구 공평로 30', phone: '053-000-5678',
  },
  {
    id: 'p6', name: '새싹베이커리', type: '가맹점', status: '영업 중',
    hours: '07:00–21:00', distance: '820m', walk: '도보 12분', items: ['식료품'],
    address: '대구 중구 동덕로 115', phone: '053-000-6789',
  },
]

export const won = (n) => `₩${Math.abs(n).toLocaleString('ko-KR')}`
