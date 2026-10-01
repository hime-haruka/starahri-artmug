document.documentElement.classList.toggle('is-embedded', window.parent !== window);

const SHEETS = {
  meta: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=0&single=true&output=csv',
  intro: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=800188842&single=true&output=csv',
  calendar: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=642643867&single=true&output=csv',
  package: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=1569880304&single=true&output=csv',
  scope: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=837380914&single=true&output=csv',
  addon: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=278450918&single=true&output=csv',
  event: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=74651160&single=true&output=csv',
  sample: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=1798078372&single=true&output=csv',
  process: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=188306907&single=true&output=csv',
  notice: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=329608604&single=true&output=csv',
  rights: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=1814102087&single=true&output=csv',
  collab: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmkq2zzlzRPtODm3P08GlMp-kBm87FNeQNxBuk1S-AeEMwyEkwDEhRRGqtgTJPKkNJ9Pe4cGliOHPK/pub?gid=360558096&single=true&output=csv'
};

const FALLBACK = {
  meta: [
    { order: '1', id: 'top', title: '', sub: '', desc: '※ 페이지 로딩으로 인해 이미지 및 샘플 확인에 다소 시간이 걸릴 수 있습니다.<br>※ 문의 전 안내 사항과 신청 양식을 꼭 확인해 주세요.<br>※ PSD 파일 확인 후 작업 가능 여부 및 최종 견적을 안내드립니다.' },
    { order: '2', id: 'intro', title: '작가 소개', sub: 'About the Creator', desc: '' },
    { order: '3', id: 'event', title: '할인/이벤트', sub: 'Event & Benefit', desc: '' },
    { order: '4', id: 'calendar', title: '작업 캘린더', sub: 'Monthly Schedule', desc: '※ 작업은 입금 순서대로 진행됩니다.<br>※ 예약 현황과 작업 내용에 따라 실제 작업 시작일 및 완료 예정일이 달라질 수 있습니다.' },
    { order: '5', id: 'package', title: '패키지 한 눈에 보기', sub: 'Packages', desc: '※ 리깅은 커스텀 / 프리미엄 두 가지 타입으로 운영됩니다.<br>※ 필요한 세부 움직임이나 특수 파츠는 패키지와 별도로 추가할 수 있습니다.' },
    { order: '6', id: 'scope', title: '기본 움직임 안내', sub: 'Standard Feature', desc: '※ 패키지 기본 작업은 아래 범위를 기준으로 진행합니다.' },
    { order: '7', id: 'addon', title: '추가 옵션', sub: 'Add-On Options', desc: '※ 기본 리깅에 원하는 부분을 선택하여 추가할 수 있습니다.<br>※ 커스텀 / 프리미엄 모두 추가 가능합니다.' },
    { order: '8', id: 'sample', title: '세부 움직임 소개', sub: 'Rigging Details', desc: '※ GIF 이미지의 크기로 인해 이미지 확인에 다소 시간이 걸릴 수 있습니다.' },
    { order: '9', id: 'process', title: '작업 진행 과정', sub: 'Commission Process', desc: '' },
    { order: '10', id: 'notice', title: '필독 안내 사항', sub: 'Must-Read Guidelines', desc: '※ 안내 사항을 확인하지 않아 발생하는 문제에 대해서는 책임지기 어렵습니다.<br>※ 신청 전 반드시 전체 안내 사항을 확인해 주세요.' },
    { order: '11', id: 'collab', title: '협업 작가 안내', sub: 'Collaborating Artists', desc: '※ 추후 업데이트 예정입니다.' },
    { order: '12', id: 'form', title: '신청 양식', sub: 'Order Form', desc: '※ 문의 시 PSD 파일을 반드시 첨부해 주세요.' },
    { order: '13', id: 'calc', title: '견적 계산기', sub: 'Cost Estimator', desc: '※ 계산기에 표시되는 금액과 실제 최종 견적에는 차이가 있을 수 있습니다.<br>※ 실제 견적은 PSD 상태 / 캐릭터 및 의상의 복잡도 / 추가 파츠 / 선택한 세부 리깅 옵션 / VBridger 여부 / 특수 애니메이션 여부를 확인한 뒤 안내됩니다.<br>※ 최종 견적은 PSD 파일 확인 후 확정됩니다.' }
  ],
  intro: [{
    name: '별아리',
    desc: '디테일을 좋아하는 작가가 작업하는 Live2D 리깅입니다.\n\n캐릭터의 매력을 최대한 살릴 수 있도록 얼굴, 눈, 머리카락, 몸의 움직임을 자연스럽게 다듬어 작업합니다.\n\n기본적인 색 빈틈, PSD 정리, 세부 수정 등 작업 중 직접 보완 가능한 부분은 함께 정리하여 진행합니다.\n\n단, 수정이나 정리에 필요한 작업량이 크게 늘어나는 경우 추가금 또는 일정 조정이 발생할 수 있습니다.\n\n모든 작업은 *VTube Studio 사용을 기준*으로 제작됩니다.\n\n아이폰 트래킹 및 VBridger를 활용한 추가 리깅도 별도 옵션으로 신청할 수 있습니다.',
    profile: 'https://drive.google.com/file/d/1PYoqQ39oX53Q1PTxguV5t138gK68-r_8/view?usp=drive_link'
  }],
  calendar: [
    { order: '1', start_date: '2026-08-01', end_date: '2026-08-15', title: '작업중', status: 'work', desc: '익명님 커스텀' },
    { order: '2', start_date: '2026-08-16', end_date: '2026-08-18', title: '휴무', status: 'off', desc: '개인 일정으로 작업 및 상담이 어렵습니다.' },
    { order: '3', start_date: '2026-08-27', end_date: '2026-09-03', title: '작업중', status: 'work', desc: '' },
    { order: '4', start_date: '2026-09-10', end_date: '2026-09-18', title: '휴무', status: 'off', desc: '견적 문의는 대응이 가능합니다.' }
  ],
  package: [
    { '항목': '패키지명', '커스텀': '커스텀 리깅', '프리미엄': '프리미엄 리깅' },
    { '항목': '한줄 소개', '커스텀': '작가의 스타일과 판단을 중심으로 빠르게 완성하는 리깅입니다.', '프리미엄': '얼굴과 몸의 진행 상황을 각각 확인하며 작업하는 기본 프리미엄 리깅입니다.' },
    { '항목': '상세 설명', '커스텀': '얼굴 작업 후 눈과 얼굴을 중심으로 *1회 컨펌*을 진행하며, 이후 몸과 세부 움직임은 캐릭터의 분위기에 맞추어 작가의 판단으로 자연스럽게 완성합니다.', '프리미엄': '얼굴 작업과 몸 작업을 *단계별로 확인*할 수 있어, 움직임과 디테일을 직접 체크하며 진행하고 싶은 분께 추천드립니다.' },
    { '항목': '작업 기간', '커스텀': '14일 ~ 20일', '프리미엄': '15일 ~ 30일' },
    { '항목': '기본 가격', '커스텀': '800,000+', '프리미엄': '900,000+' },
    { '항목': '컨펌', '커스텀': '1회', '프리미엄': '2회' },
    { '항목': '얼굴 움직임', '커스텀': '기본 ±30~40도', '프리미엄': '기본 ±30~40도' },
    { '항목': '입', '커스텀': '기본 9개 / 3×3', '프리미엄': '기본 9개 / 3×3' },
    { '항목': '눈', '커스텀': '기본 속눈썹 움직임', '프리미엄': '기본 속눈썹 움직임' },
    { '항목': '눈동자', '커스텀': '기본 눈동자 물리', '프리미엄': '기본 눈동자 물리' },
    { '항목': '기본 표정', '커스텀': '발그레 / 슬픔 / 정색', '프리미엄': '발그레 / 슬픔 / 정색' },
    { '항목': '하체', '커스텀': '기본 무릎 움직임', '프리미엄': '기본 무릎 움직임' },
    { '항목': 'ON/OFF 파츠', '커스텀': '기본 대응', '프리미엄': '기본 대응' },
    { '항목': '추가 파츠', '커스텀': '별도 문의', '프리미엄': '별도 문의' },
    { '항목': '반신 / SD', '커스텀': '별도 문의', '프리미엄': '별도 문의' },
    { '항목': '협업 작가 혜택', '커스텀': '할인 또는 표정 추가', '프리미엄': '할인 또는 표정 추가' },
    { '항목': '후기 작성 혜택', '커스텀': '할인 또는 표정 추가', '프리미엄': '할인 또는 표정 추가' },
    { '항목': 'SNS / 포트폴리오 비공개', '커스텀': '추가금', '프리미엄': '추가금' },
    { '항목': '저작권 구매', '커스텀': '별도 안내', '프리미엄': '별도 안내' }
  ],
  scope: [
    { '항목': '얼굴', '기본 작업 기준': '약 ±30~40도' },
    { '항목': '몸', '기본 작업 기준': '약 ±30도' },
    { '항목': '입', '기본 작업 기준': '9개 / 3×3' },
    { '항목': '헤어', '기본 작업 기준': '큰 흐름 및 앞머리 중심' },
    { '항목': '하체', '기본 작업 기준': '기본적인 무릎 움직임' },
    { '항목': '눈', '기본 작업 기준': '속눈썹 및 기본 눈동자 움직임' },
    { '항목': '하단 안내', '기본 작업 기준': '캐릭터 디자인과 PSD 구조에 따라 실제 가동 범위와 표현 방식은 달라질 수 있습니다.' },
    { '항목': '하단 안내', '기본 작업 기준': '더 넓은 각도나 세밀한 움직임을 원하는 경우 추가 옵션으로 신청할 수 있습니다.' }
  ],
  addon: [
    { title: '동물 귀', desc: '', price: '100,000', type: 'add' },
    { title: '동물 꼬리', desc: '', price: '100,000', type: 'add' },
    { title: '날개', desc: '', price: '100,000', type: 'add' },
    { title: '추가 표정', desc: '', price: '50,000', type: 'unit' },
    { title: '패드', desc: '', price: '100,000', type: 'add' },
    { title: '마이크', desc: '', price: '100,000', type: 'add' },
    { title: '프릴', desc: '', price: '100,000', type: 'add' },
    { title: '투명 소재', desc: '', price: '50,000', type: 'add' },
    { title: 'VBridger', desc: '입 X축 / 볼빵빵 / 메롱 / 세부 입 움직임 / 추가 트래킹\n-※ 아이폰 트래킹을 사용하는 경우 더욱 자연스럽게 활용할 수 있습니다.-', price: '200,000', type: 'add' },
    { title: '세부 리깅 추가', desc: '얼굴 가동 범위 증가 / 몸 가동 범위 증가 / 측면 얼굴 작업 / 눈동자 세부 작업 / 눈동자 깊이 표현 / 눈물 연동 눈동자 작업 / 눈동자 물리 강화 / 헤어 세부 물리 / 잔머리 세부 작업 / 입 형태 추가 / 혀 세부 작업 / 볼빵빵 / 턱 움직임 / 하체 스텝 / 골반 움직임 / ON/OFF 파츠 개별 움직임 / 기타 캐릭터 맞춤 움직임\n-※ 측면 얼굴 작업은 약 50~70도 수준의 측면 표현을 원하는 경우, 필요한 파츠가 충분히 분리되어 있어야 합니다. 작업 전 가이드 선화 이상의 자료가 필요하며, 모델 구조에 따라 측면용 그림자 이미지 등 추가 자료를 요청드릴 수 있습니다.-', price: '별도 상담', type: 'etc' },
    { title: '기타 파츠 / 특수 작업', desc: '링 / 반투명 / 글리터 / 그라디언트 / 복장 교체 / 헤어 교체 / MD·SD 변신 / 모델 축소 / 루프 애니메이션 / 추가 소품 / 특수 파츠 / 기타 애니메이션', price: '별도 상담', type: 'etc' }
  ],
  event: [
    { title: '후기 작성 약속', desc: '후기 작성을 약속해 주시는 경우 아래 혜택 중 하나를 선택할 수 있습니다.', benefit: '50,000원 할인\n표정 1개 무료 추가' },
    { title: '협업 작가 이용', desc: '협업 작가를 통해 모델 제작을 진행하는 경우 아래 혜택 중 하나를 선택할 수 있습니다.', benefit: '50,000원 할인\n표정 1개 무료 추가' },
    { title: '후기 작성 + 협업 작가', desc: '두 조건을 모두 충족할 경우 아래 혜택 중 하나를 선택할 수 있습니다.', benefit: '100,000원 할인\n표정 2개 무료 추가' },
    { title: '오픈 이벤트', desc: '이벤트 기간에는 지정된 추가 리깅 옵션을 서비스로 제공해드립니다.\n\n*오픈 이벤트는 약 6개월간 진행 예정입니다. (변동 가능)*', benefit: '지정된 추가 리깅 옵션 서비스' },
    { title: '포트폴리오 이벤트 작업', desc: '포트폴리오 제작을 위한 이벤트 작업 2건을 모집할 예정입니다.\n\nPSD 파일 확인 후 캐릭터에 어울리는 범위 내에서 작가 재량으로 추가 작업을 진행합니다.\n\n*SNS 공개 / 포트폴리오 공개 / 샘플 이미지 및 영상 사용이 가능하신 경우에만 신청이 가능합니다.*\n\n*비공개 작업을 원하시는 경우 이벤트 참여가 어렵습니다.*', benefit: '커스텀 리깅 가격을 기준으로 프리미엄 수준의 작업 및 일부 추가 옵션 제공' }
  ],
  sample: [
    { c_order: '1', category: '얼굴/눈', order: '1', title: '눈 물리', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '2', title: '눈동자 물리', img_url: 'https://drive.google.com/file/d/1p2DUABUd68Xv23UJpRAlwG8yDE1BKiLd/view?usp=drive_link' },
    { c_order: '1', category: '얼굴/눈', order: '3', title: '눈동자 깊이', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '4', title: '눈물 (그렁그렁)', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '5', title: '눈물 (주륵)', img_url: 'https://drive.google.com/file/d/10tz6UEIKiIrgHkcaxVhVa_dTTdN0CPjN/view?usp=drive_link' },
    { c_order: '1', category: '얼굴/눈', order: '6', title: '눈 반짝', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '7', title: '눈 하트', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '8', title: '빙글빙글', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '9', title: '정색', img_url: '' },
    { c_order: '1', category: '얼굴/눈', order: '10', title: '당황', img_url: '' },
    { c_order: '2', category: '입', order: '1', title: '기본 입 움직임', img_url: '' },
    { c_order: '2', category: '입', order: '2', title: '추가 입 형태', img_url: '' },
    { c_order: '2', category: '입', order: '3', title: '3자 입', img_url: '' },
    { c_order: '2', category: '입', order: '4', title: '입 물리', img_url: '' },
    { c_order: '2', category: '입', order: '5', title: '볼빵빵', img_url: '' },
    { c_order: '2', category: '입', order: '6', title: '혀', img_url: '' },
    { c_order: '3', category: '헤어', order: '1', title: '기본 머리카락 물리', img_url: '' },
    { c_order: '3', category: '헤어', order: '2', title: '세부 잔머리 물리', img_url: '' },
    { c_order: '3', category: '헤어', order: '3', title: '다가오기', img_url: '' },
    { c_order: '4', category: '몸/하체', order: '1', title: '호흡 물리', img_url: 'https://drive.google.com/file/d/1CqsdWhPFBf99O8ZOZp3Tr2X2k0ZltJ-t/view?usp=drive_link' },
    { c_order: '4', category: '몸/하체', order: '2', title: '기본 몸 움직임', img_url: 'https://drive.google.com/file/d/1brp-HUnTpqaY5enZ2wA77pJRPSfZJ_kT/view?usp=drive_link' },
    { c_order: '4', category: '몸/하체', order: '3', title: '다리 콕콕', img_url: '' },
    { c_order: '4', category: '몸/하체', order: '4', title: '하체 스탭', img_url: '' },
    { c_order: '4', category: '몸/하체', order: '5', title: '골반 움직임', img_url: '' },
    { c_order: '4', category: '몸/하체', order: '6', title: '다가오기', img_url: '' },
    { c_order: '4', category: '몸/하체', order: '7', title: '후드 On/Off', img_url: 'https://drive.google.com/file/d/1tU4pyPDqzaZxlqZZTvuyxSCjbl0Mx92L/view?usp=drive_link' },
    { c_order: '5', category: '특수 파츠', order: '1', title: '게임기 파츠', img_url: 'https://drive.google.com/file/d/1Cm1N3boGP8BWIOFdF626pXyV-b51dly5/view?usp=drive_link' },
    { c_order: '5', category: '특수 파츠', order: '2', title: '손가락 움직임', img_url: '' },
    { c_order: '5', category: '특수 파츠', order: '3', title: '동물 귀', img_url: '' },
    { c_order: '5', category: '특수 파츠', order: '4', title: '꼬리', img_url: '' },
    { c_order: '5', category: '특수 파츠', order: '5', title: '미니미 (표정)', img_url: 'https://drive.google.com/file/d/1YWAe3EV5Hwg4jIPOraUD4fR6SStBBBko/view?usp=drive_link' },
    { c_order: '5', category: '특수 파츠', order: '6', title: '미니미 (움직임)', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '1', title: '프릴', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '2', title: '반투명 소재', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '3', title: '투명 소재', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '4', title: '글리터 소재', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '5', title: '그라데이션 소재', img_url: '' },
    { c_order: '6', category: '소재 및 복잡도', order: '6', title: '다수의 악세서리', img_url: '' },
    { c_order: '7', category: '애니메이션', order: '1', title: '루프 애니메이션', img_url: '' },
    { c_order: '7', category: '애니메이션', order: '2', title: 'LD → MD → SD', img_url: '' },
    { c_order: '7', category: '애니메이션', order: '3', title: '기타', img_url: 'https://drive.google.com/file/d/1MMP7PUvJDkr7gNABBZ0VOqiZNN2i9wwm/view?usp=drive_link' }
  ],
  process: [
    { category: '프리미엄', step: '1', content: 'PSD 파일 전달 및 문의' },
    { category: '프리미엄', step: '2', content: 'PSD 확인 / 견적 안내 / 주문 확정' },
    { category: '프리미엄', step: '3', content: 'PSD 파츠 확인 및 필요한 수정' },
    { category: '프리미엄', step: '4', content: '머리 및 얼굴 작업' },
    { category: '프리미엄', step: '5', content: '1차 컨펌' },
    { category: '프리미엄', step: '6', content: '몸 작업' },
    { category: '프리미엄', step: '7', content: '2차 컨펌' },
    { category: '프리미엄', step: '8', content: '세부 디테일 및 물리 작업' },
    { category: '프리미엄', step: '9', content: '최종 확인 및 파일 전달' },
    { category: '프리미엄', step: '10', content: 'VTube Studio 기본 세팅 지원' },
    { category: '커스텀', step: '1', content: 'PSD 파일 전달 및 문의' },
    { category: '커스텀', step: '2', content: 'PSD 확인 / 견적 안내 / 주문 확정' },
    { category: '커스텀', step: '3', content: 'PSD 파츠 확인 및 필요한 수정' },
    { category: '커스텀', step: '4', content: '머리 및 얼굴 작업' },
    { category: '커스텀', step: '5', content: '얼굴 중심 1회 컨펌' },
    { category: '커스텀', step: '6', content: '몸 및 세부 디테일 작업' },
    { category: '커스텀', step: '7', content: '최종 확인 및 파일 전달' },
    { category: '커스텀', step: '8', content: 'VTube Studio 기본 세팅 지원' }
  ],
  notice: [
    { order: '1', icon: '💬', title: '컨펌 안내', desc: '컨펌은 각 작업 단계의 큰 흐름과 방향을 확인하는 과정입니다.\n\n컨펌 이후 이전 단계로 돌아가 수정하는 것은 어렵습니다.\n\n추가 컨펌을 요청하는 경우 비용과 작업 기간이 추가될 수 있습니다.\n\n또한 컨펌 시점의 작업물은 이후 세부 디테일 및 물리 작업을 거쳐 최종 결과물에서 더욱 자연스럽게 보완될 수 있습니다.' },
    { order: '2', icon: '📢', title: '작업물 공개 안내', desc: '작업물은 작가의 포트폴리오, SNS, 유튜브, 샘플 이미지 및 영상 등에 사용될 수 있습니다.\n\n공개를 원하지 않는 경우 신청 시 반드시 비공개 요청을 기재해 주세요.\n\n비공개 요청 시 추가금이 발생할 수 있습니다.\n\n별도의 요청이 없는 경우 작업물 공개에 동의한 것으로 간주합니다.' },
    { order: '3', icon: '📐', title: '제작 기준 안내', desc: '본 작업은 VTube Studio 사용을 기준으로 제작됩니다.\n\n기본 표정 및 움직임에 대해 별도의 가이드가 없는 경우 캐릭터의 디자인과 분위기에 맞추어 임의로 작업합니다.\n\n특정한 형태나 움직임을 원하는 경우 반드시 작업 전 자료와 함께 전달해 주세요.\n\n자료가 부족하거나 작업 난이도가 지나치게 높은 경우 작업을 거절할 수 있습니다.' },
    { order: '4', icon: '🧩', title: 'PSD 및 파츠 안내', desc: '문의 시 PSD 파일 첨부는 필수입니다.\n\n작업 가능 여부와 최종 견적은 PSD를 직접 확인한 뒤 안내드립니다.\n\nPSD 파일이 미정돈된 경우 작업에 필요한 범위 내에서 자체적으로 정리할 수 있습니다.\n\n단, 파츠 정리 및 수정 범위가 과도한 경우 추가금 또는 일정 조정이 발생할 수 있습니다.\n\n기본 모델은 다음 구성을 기준으로 합니다.\n- 의상 1종\n- 헤어 1종\n\n다음 항목이 포함되어 있다면 반드시 문의 시 기재해 주세요.\n- 추가 의상\n- 추가 헤어\n- ON/OFF 파츠\n- 변신 모션\n- 특수 애니메이션\n- 복잡한 장식\n- 비대칭 구조\n- 투명 / 반투명 소재\n- 프릴\n- 날개\n- 동물 귀 / 꼬리\n- 기타 특수 파츠\n\n다음과 같은 경우 작업이 어려울 수 있습니다.\n- 파츠 분리가 지나치게 부족한 경우\n- 작업에 필요한 이미지 정보가 부족한 경우\n- 지나치게 복잡하여 정상적인 리깅이 어려운 구조\n- 19금 또는 고어 표현\n- 기타 작업이 어렵다고 판단되는 경우' },
    { order: '5', icon: '📅', title: '수정 / 컨펌 / 일정 안내', desc: '수정 요청은 지정된 컨펌 기간에 가능합니다.\n\n컨펌이 완료된 이후 이전 단계의 수정은 원칙적으로 불가능합니다.\n\n추가 컨펌 또는 대규모 수정이 필요한 경우 추가 비용과 작업 기간이 발생할 수 있습니다.\n\n안내된 작업 기간은 고객님의 컨펌 대기 시간을 제외한 실제 작업 기간 기준입니다.\n\n다음 상황에서는 전체 일정이 연장될 수 있습니다.\n- 컨펌 답변 지연\n- 추가 수정\n- 추가 파츠 발생\n- 작업 중 옵션 추가\n- PSD 수정 필요\n\nPSD의 캔버스 크기나 해상도가 작업에 적합하지 않은 경우 별도로 안내드립니다.' },
    { order: '6', icon: '💰', title: '환불 안내', desc: '작업 시작 전에는 작업 진행 상태에 따라 환불 상담이 가능합니다.\n\n리깅 작업이 시작된 이후에는 단순 변심에 의한 환불이 불가능합니다.\n\n작업 진행 중 새로운 파츠 또는 요청 사항이 추가되는 경우 추가 비용과 일정이 발생할 수 있습니다.' },
    { order: '7', icon: '©️', title: '사용 범위 / 저작권 안내', desc: '기본 리깅 비용에는 방송 활동을 위한 모델 사용 권한이 포함됩니다.\n\n작업한 리깅 데이터의 무단 양도, 재판매, 배포 및 사전 협의되지 않은 형태의 사용은 불가능합니다.\n\n굿즈 제작, 데이터 변형, 재판매 목적 활용, 기타 추가적인 수익 사업에 사용하는 경우 별도 문의가 필요합니다.\n\n[저작권 구매]\n\n저작권 구매 비용은 *전체 작업 금액의 +40%*입니다.\n\n저작권 구매 시 사용 가능 범위가 확대될 수 있으나, 데이터 변형 및 재판매 등 일부 권리는 별도 협의가 필요합니다.\n\n구체적인 사용 범위는 신청 목적에 따라 안내드립니다.' },
    { order: '8', icon: '📦', title: '제공 파일', desc: '작업 완료 후 VTube Studio에서 사용할 수 있는 리깅 데이터를 전달드립니다.\n\n기본 제공 파일에는 다음 항목이 포함됩니다.\n- moc3 파일\n- 텍스처 파일\n- 모델 설정 파일\n- VTube Studio 사용을 위한 기본 파일\n\n※ 실제 파일 구성은 신청 타입과 추가 옵션에 따라 달라질 수 있습니다.' },
    { order: '9', icon: '⚙️', title: 'VTube Studio 기본 세팅', desc: '작업 완료 후 VTube Studio에서 모델을 사용할 수 있도록 기본 세팅을 지원합니다.\n\n아이폰 연결 및 트래킹 확인이 필요한 경우 디스코드를 통한 확인이 필요할 수 있습니다.' },
    { order: '10', icon: '🛠️', title: 'A/S 안내', desc: '파일 전달일로부터 2주 이내에 확인되는 작업 오류 또는 미흡한 부분은 무상으로 수정해드립니다.\n\n다음 항목은 무상 A/S 대상에 포함되지 않습니다.\n- 작업 완료 후 새롭게 추가된 요청\n- 이미 컨펌이 완료된 사항의 변경\n- 사용자가 직접 파일을 수정하여 발생한 오류\n- 새로운 파츠 또는 기능 추가\n- 안내된 작업 범위를 벗어난 추가 작업' }
  ],
  rights: [
    { '사용 항목': '비상업용', '방송 사용': '○', '굿즈 제작': '×', '그 외 수익 창출': '×' },
    { '사용 항목': '상업용', '방송 사용': '○', '굿즈 제작': '○', '그 외 수익 창출': '×' }
  ],
  collab: [{ nick: '슈라', desc: '리깅 10만원 할인 + 채팅 2만원 할인', benefit: '100000', link: 'https://artmug.kr/index.php?channel=view&uid=52516', img_url: 'https://artmug.kr/image/brand/332871765918878.jpg' }]
};

const appState = {
  data: {},
  failed: [],
  calendarMonth: null,
  sampleCategory: '',
  processCategory: '',
  sampleSwitchTimer: null,
  processSwitchBusy: false,
  processPendingCategory: '',
  parentViewport: null,
  standaloneObserver: null,
  revealViewportFrame: 0,
  formQty: {}
};

const els = {
  loading: document.getElementById('loadingState'),
  error: document.getElementById('errorState'),
  sections: document.getElementById('sections'),
  topMeta: document.getElementById('topMeta'),
  quickNav: document.getElementById('quickNav'),
  imageModal: document.getElementById('imageModal'),
  imageModalImg: document.getElementById('imageModalImg'),
  imageModalCaption: document.getElementById('imageModalCaption')
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatRich(value = '') {
  let text = String(value ?? '')
    .replaceAll('&#x9;', '')
    .replace(/\\([*~-])/g, '$1')
    .replace(/<br\s*\/?>/gi, '\n');
  text = escapeHtml(text);
  text = text.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');
  text = text.replace(/(^|\n)-([^\n]+)-(\n|$)/g, '$1<small>$2</small>$3');
  const blocks = text.split(/\n{2,}/).map(block => {
    const lines = block.split('\n');
    const allBullets = lines.every(line => /^-\s*/.test(line.trim()));
    if (allBullets) {
      const items = lines.map(line => `<li>${line.trim().replace(/^-\s*/, '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    return `<p>${lines.join('<br>')}</p>`;
  });
  return blocks.join('');
}

function formatInline(value = '') {
  let text = String(value ?? '').replaceAll('&#x9;', '').replace(/\\([*~-])/g, '$1');
  text = escapeHtml(text);
  text = text.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');
  return text.replace(/\n/g, '<br>');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }
  const cleanRows = rows.filter(r => r.some(cell => String(cell).trim() !== ''));
  if (!cleanRows.length) return [];
  const headers = cleanRows[0].map(h => h.trim());
  return cleanRows.slice(1).map(values => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index] ?? '';
    });
    return item;
  }).filter(item => Object.values(item).some(value => String(value).trim() !== ''));
}

const SHEET_CACHE_KEY = 'starahri-rigging-sheet-cache-v2';
const SHEET_CACHE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

function cloneFallback() {
  return JSON.parse(JSON.stringify(FALLBACK));
}

function readSheetCache() {
  try {
    const raw = localStorage.getItem(SHEET_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached || typeof cached !== 'object' || !cached.data) return null;
    if (!cached.savedAt || Date.now() - cached.savedAt > SHEET_CACHE_MAX_AGE) return null;
    return cached.data;
  } catch (error) {
    return null;
  }
}

function writeSheetCache(data) {
  try {
    localStorage.setItem(SHEET_CACHE_KEY, JSON.stringify({
      savedAt: Date.now(),
      data
    }));
  } catch (error) {
    // Storage can be unavailable in some embedded/private browser contexts.
  }
}

async function fetchCsv(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: 'no-cache',
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return parseCsv(text.replace(/^\uFEFF/, ''));
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function numeric(value) {
  const parsed = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function won(value) {
  return `${Math.round(value).toLocaleString('ko-KR')}원`;
}

function googleDriveFileId(url = '') {
  const raw = String(url || '').trim();
  if (!raw || !/drive\.google\.com/i.test(raw)) return '';
  const pathMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (pathMatch) return pathMatch[1];
  try {
    const parsed = new URL(raw);
    const id = parsed.searchParams.get('id');
    if (id) return id;
    const parts = parsed.pathname.split('/').filter(Boolean);
    const dIndex = parts.indexOf('d');
    if (dIndex >= 0 && parts[dIndex + 1]) return parts[dIndex + 1];
  } catch (error) {
    return '';
  }
  return '';
}

function driveImageCandidates(url = '') {
  const raw = String(url || '').trim();
  if (!raw) return [];
  const id = googleDriveFileId(raw);
  if (!id) return [raw];
  const encoded = encodeURIComponent(id);
  return [
    `https://lh3.googleusercontent.com/d/${encoded}`,
    `https://drive.google.com/thumbnail?id=${encoded}&sz=w2000`,
    `https://drive.google.com/uc?export=view&id=${encoded}`
  ];
}

function driveImage(url = '') {
  return driveImageCandidates(url)[0] || '';
}

function sectionOrnament(id) {
  const ornaments = {
    intro: 'cluster',
    event: 'cluster',
    package: 'crystal',
    scope: 'cluster',
    sample: 'crystal',
    process: 'cluster',
    notice: 'crystal',
    collab: 'cluster'
  };
  const type = ornaments[id];
  if (!type) return '';
  if (type === 'crystal') {
    return `<span class="section-ornament section-ornament-crystal" aria-hidden="true">
      <svg viewBox="0 0 72 68" focusable="false">
        <g class="ornament-crystal-gem">
          <path class="ornament-glow" d="M36 5 52 20 47 47 36 62 25 47 20 20Z"/>
          <path class="ornament-crystal-shell" d="M36 8 49 21 45 45 36 58 27 45 23 21Z"/>
          <path class="ornament-crystal-face ornament-face-a" d="M36 8 36 51 23 21Z"/>
          <path class="ornament-crystal-face ornament-face-b" d="M36 8 49 21 36 51Z"/>
          <path class="ornament-crystal-face ornament-face-c" d="M23 21 36 51 27 45Z"/>
          <path class="ornament-crystal-face ornament-face-d" d="M49 21 45 45 36 51Z"/>
          <path class="ornament-crystal-line" d="M23 21h26M36 8 27 45M36 8l9 37M27 45l9 13 9-13"/>
        </g>
        <path class="ornament-star ornament-star-a" d="M14 12c1.2 4.8 3.7 7.3 8.5 8.5-4.8 1.2-7.3 3.7-8.5 8.5-1.2-4.8-3.7-7.3-8.5-8.5 4.8-1.2 7.3-3.7 8.5-8.5Z"/>
        <path class="ornament-star ornament-star-b" d="M59 39c.8 3.2 2.5 4.9 5.7 5.7-3.2.8-4.9 2.5-5.7 5.7-.8-3.2-2.5-4.9-5.7-5.7 3.2-.8 4.9-2.5 5.7-5.7Z"/>
        <circle class="ornament-dot ornament-dot-a" cx="60" cy="15" r="2.1"/>
      </svg>
    </span>`;
  }
  return `<span class="section-ornament section-ornament-cluster" aria-hidden="true">
    <svg viewBox="0 0 76 66" focusable="false">
      <path class="ornament-star ornament-star-main" d="M37 5c1.9 12.4 8.7 19.2 21.1 21.1C45.7 28 38.9 34.8 37 47.2 35.1 34.8 28.3 28 15.9 26.1 28.3 24.2 35.1 17.4 37 5Z"/>
      <path class="ornament-star ornament-star-secondary" d="M61 6c.8 5 3.5 7.7 8.5 8.5-5 .8-7.7 3.5-8.5 8.5-.8-5-3.5-7.7-8.5-8.5C57.5 13.7 60.2 11 61 6Z"/>
      <path class="ornament-star ornament-star-tertiary" d="M17 39c.7 4 2.8 6.1 6.8 6.8-4 .7-6.1 2.8-6.8 6.8-.7-4-2.8-6.1-6.8-6.8 4-.7 6.1-2.8 6.8-6.8Z"/>
      <circle class="ornament-ring" cx="55" cy="47" r="5.2"/>
      <circle class="ornament-dot ornament-dot-a" cx="68" cy="38" r="2.4"/>
      <circle class="ornament-dot ornament-dot-b" cx="31" cy="56" r="1.9"/>
    </svg>
  </span>`;
}

function sectionHead(id) {
  const meta = appState.data.meta.find(item => item.id === id) || {};
  const order = String(meta.order || '').padStart(2, '0');
  const ornament = sectionOrnament(id);
  return `
    <header class="section-head${ornament ? ' has-section-ornament' : ''}" data-index="${escapeHtml(order)}">
      <div class="section-index" data-index="${escapeHtml(order)}">${escapeHtml(order)}</div>
      <div class="section-title-wrap">
        <div class="section-sub">${escapeHtml(meta.sub || id)}</div>
        <h2 class="section-title">${escapeHtml(meta.title || id)}</h2>
        ${meta.desc ? `<div class="section-desc">${formatInline(meta.desc)}</div>` : ''}
      </div>
      ${ornament}
    </header>
  `;
}

function setSection(id, content) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = `${sectionHead(id)}${content}`;
}

function renderTop() {
  const top = appState.data.meta.find(item => item.id === 'top');
  els.topMeta.innerHTML = top?.desc ? formatInline(top.desc) : '';
  const navItems = appState.data.meta
    .filter(item => item.id && item.id !== 'top' && item.id !== 'calc' && document.getElementById(item.id))
    .sort((a, b) => numeric(a.order) - numeric(b.order));
  if (els.quickNav) {
    els.quickNav.innerHTML = navItems.map(item => `<button type="button" class="quick-nav-button" data-quick-target="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.title)}로 이동"><span class="quick-nav-label">${escapeHtml(item.title)}</span></button>`).join('');
  }
}

function renderIntro() {
  const item = appState.data.intro[0];
  if (!item) return setSection('intro', '<div class="note-strip">등록된 작가 소개가 없습니다.</div>');
  const img = driveImage(item.profile);
  const photo = img
    ? `<div class="profile-photo"><img src="${escapeHtml(img)}" alt="${escapeHtml(item.name || '작가')} 프로필" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-image-fallback data-image-source="${escapeHtml(item.profile || '')}"><div class="profile-photo-fallback" hidden>${escapeHtml((item.name || 'A').slice(0, 1))}</div></div>`
    : `<div class="profile-photo"><div class="profile-photo-fallback">${escapeHtml((item.name || 'A').slice(0, 1))}</div></div>`;
  setSection('intro', `
    <div class="profile-card">
      ${photo}
      <div>
        <div class="profile-name"><h3>${escapeHtml(item.name || '작가')}</h3><span class="profile-badge">Live2D Rigger</span></div>
        <div class="rich-text">${formatRich(item.desc)}</div>
      </div>
    </div>
  `);
}

function renderEvent() {
  const rows = appState.data.event;
  const content = rows.length
    ? `<div class="event-grid">${rows.map(row => `
        <article class="event-card">
          <h3>${escapeHtml(row.title)}</h3>
          <div class="event-desc rich-text">${formatRich(row.desc)}</div>
          <div class="event-benefit">${formatInline(row.benefit)}</div>
        </article>`).join('')}</div>`
    : '<div class="note-strip">현재 등록된 이벤트가 없습니다.</div>';
  setSection('event', content);
}

function parseDateLocal(value) {
  const [y, m, d] = String(value).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function renderCalendar() {
  const rows = appState.data.calendar;
  if (!appState.calendarMonth) {
    const first = rows.map(row => parseDateLocal(row.start_date)).filter(Boolean).sort((a, b) => a - b)[0];
    appState.calendarMonth = first ? new Date(first.getFullYear(), first.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }
  const current = appState.calendarMonth;
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());
  const gridEnd = new Date(year, month, lastDay.getDate() + (6 - lastDay.getDay()));
  const today = new Date();
  const weeks = [];
  const totalWeeks = Math.round((gridEnd - gridStart) / 604800000) + 1;
  for (let weekStart = new Date(gridStart); weekStart <= gridEnd; weekStart.setDate(weekStart.getDate() + 7)) {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
    const segments = rows.map((row, rowIndex) => {
      const eventStart = parseDateLocal(row.start_date);
      const eventEnd = parseDateLocal(row.end_date) || eventStart;
      if (!eventStart || !eventEnd || eventEnd < start || eventStart > end) return null;
      const segStart = eventStart < start ? start : eventStart;
      const segEnd = eventEnd > end ? end : eventEnd;
      const startIndex = Math.round((segStart - start) / 86400000);
      const endIndex = Math.round((segEnd - start) / 86400000);
      return { row, rowIndex, startIndex, endIndex };
    }).filter(Boolean).sort((a, b) => a.startIndex - b.startIndex || a.endIndex - b.endIndex);
    const trackEnds = [];
    segments.forEach(segment => {
      let track = trackEnds.findIndex(lastEnd => segment.startIndex > lastEnd);
      if (track < 0) track = trackEnds.length;
      segment.track = track;
      trackEnds[track] = segment.endIndex;
    });
    const trackCount = Math.max(1, trackEnds.length);
    const dayHtml = days.map(day => `<div class="calendar-day${day.getMonth() !== month ? ' is-muted' : ''}${sameDay(day, today) ? ' is-today' : ''}"><span class="calendar-number">${day.getDate()}</span></div>`).join('');
    const weekIndex = weeks.length;
    const eventHtml = segments.map(segment => {
      const row = segment.row;
      const label = row.title || (row.status === 'off' ? '휴무' : '작업중');
      const tooltip = row.desc || label;
      const edgeClass = segment.startIndex >= 5 ? ' is-edge-right' : '';
      const verticalClass = weekIndex >= totalWeeks - 2 ? ' is-tooltip-up' : '';
      return `<div class="calendar-event ${row.status === 'off' ? 'off' : ''}${edgeClass}${verticalClass}" style="--event-start:${segment.startIndex};--event-span:${segment.endIndex - segment.startIndex + 1};--event-track:${segment.track}" tabindex="0" aria-label="${escapeHtml(`${label}: ${tooltip}`)}"><span class="calendar-event-label">${escapeHtml(label)}</span><span class="calendar-event-popover" role="tooltip"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(tooltip)}</span></span></div>`;
    }).join('');
    weeks.push(`<div class="calendar-week" style="--track-count:${trackCount};--week-height:${60 + trackCount * 27}px"><div class="calendar-week-days">${dayHtml}</div><div class="calendar-events">${eventHtml}</div></div>`);
  }
  setSection('calendar', `
    <div class="calendar-toolbar">
      <div class="calendar-period"><span>MONTHLY SCHEDULE</span><strong>${year}년 ${month + 1}월</strong></div>
      <div class="calendar-controls">
        <button class="icon-button" type="button" data-calendar-prev aria-label="이전 달">‹</button>
        <button class="icon-button" type="button" data-calendar-next aria-label="다음 달">›</button>
      </div>
    </div>
    <div class="calendar-shell">
      <div class="calendar-weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
      <div class="calendar-weeks">${weeks.join('')}</div>
    </div>
    <div class="calendar-legend"><span class="legend-item"><span class="legend-dot"></span>작업중</span><span class="legend-item"><span class="legend-dot off"></span>휴무</span><span class="calendar-hover-note">일정에 마우스를 올리면 상세 내용을 확인할 수 있습니다.</span></div>
  `);
}

function packageKeys(rows) {
  if (!rows.length) return [];
  return Object.keys(rows[0]).filter(key => key !== '항목' && key.trim());
}

function packageRow(rows, label) {
  return rows.find(row => row['항목'] === label) || {};
}

function displayPackagePrice(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const amount = numeric(raw);
  return amount ? `${amount.toLocaleString('ko-KR')}원${raw.includes('+') ? '+' : ''}` : raw;
}

function renderPackage() {
  const rows = appState.data.package;
  const keys = packageKeys(rows);
  if (!rows.length || !keys.length) return setSection('package', '<div class="note-strip">등록된 패키지 정보가 없습니다.</div>');
  const names = packageRow(rows, '패키지명');
  const intros = packageRow(rows, '한줄 소개');
  const details = packageRow(rows, '상세 설명');
  const prices = packageRow(rows, '기본 가격');
  const comparisonRows = rows.filter(row => !['패키지명', '한줄 소개', '상세 설명', '기본 가격'].includes(row['항목']));
  const introCards = `<div class="event-grid" style="margin-bottom:16px">${keys.map(key => `
    <article class="event-card" style="min-height:0">
      <h3>${escapeHtml(names[key] || key)}</h3>
      <div class="event-desc">${escapeHtml(intros[key] || '')}</div>
      <div class="rich-text">${formatRich(details[key] || '')}</div>
      <div class="event-benefit">기본가 ${escapeHtml(displayPackagePrice(prices[key]))}</div>
    </article>`).join('')}</div>`;
  const table = `
    <div class="package-table-wrap">
      <table class="package-table">
        <thead>
          <tr><th>비교 항목</th>${keys.map(key => `<th><span class="package-name">${escapeHtml(names[key] || key)}</span></th>`).join('')}</tr>
        </thead>
        <tbody>
          ${comparisonRows.map((row, index) => `<tr><th>${escapeHtml(row['항목'])}</th>${keys.map((key, keyIndex) => `<td class="${keyIndex === keys.length - 1 && index < 2 ? 'package-highlight' : ''}">${formatInline(row[key] || '')}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  setSection('package', `${introCards}${table}`);
}

function renderScope() {
  const rows = appState.data.scope;
  const notes = rows.filter(row => row['항목'] === '하단 안내');
  const items = rows.filter(row => row['항목'] !== '하단 안내');
  setSection('scope', `
    <div class="scope-grid">${items.map(row => `<div class="scope-row"><span class="scope-label">${escapeHtml(row['항목'])}</span><span class="scope-value">${formatInline(row['기본 작업 기준'])}</span></div>`).join('')}</div>
    ${notes.length ? `<div class="note-strip">${notes.map(row => `<span>※ ${formatInline(row['기본 작업 기준'])}</span>`).join('')}</div>` : ''}
  `);
}

function renderAddon() {
  const rows = appState.data.addon;
  const fixed = rows.filter(row => row.type !== 'etc');
  const consult = rows.filter(row => row.type === 'etc');
  const card = row => `<article class="addon-card ${row.type === 'etc' ? 'consult' : ''}"><div><h3 class="addon-title">${escapeHtml(row.title)}</h3>${row.desc ? `<div class="addon-desc rich-text">${formatRich(row.desc)}</div>` : ''}</div><span class="addon-price">${escapeHtml(row.price === '별도 상담' ? row.price : displayPackagePrice(row.price))}${row.type === 'unit' ? ' / 개' : ''}</span></article>`;
  setSection('addon', `
    <div class="addon-groups">
      <div><h3 class="addon-group-title">금액이 정해진 옵션</h3><div class="addon-grid">${fixed.map(card).join('')}</div></div>
      <div><h3 class="addon-group-title">상담 후 견적 옵션</h3><div class="addon-grid">${consult.map(card).join('')}</div></div>
    </div>
  `);
}

function sampleCategories(rows) {
  const map = new Map();
  rows.forEach(row => {
    if (!row.category) return;
    const order = numeric(row.c_order) || 999;
    if (!map.has(row.category) || order < map.get(row.category)) map.set(row.category, order);
  });
  return [...map.entries()].sort((a, b) => a[1] - b[1]).map(([name]) => name);
}

function sampleCardsMarkup(category) {
  const visible = appState.data.sample
    .filter(row => row.category === category)
    .sort((a, b) => numeric(a.order) - numeric(b.order));
  return visible.map(row => {
    const img = driveImage(row.img_url);
    const media = img
      ? `<div class="sample-media"><img src="${escapeHtml(img)}" alt="${escapeHtml(row.title)} 샘플" loading="lazy" decoding="async" referrerpolicy="no-referrer" tabindex="0" role="button" aria-label="${escapeHtml(row.title)} 이미지 크게 보기" data-sample-image data-image-source="${escapeHtml(row.img_url || '')}"><div class="sample-placeholder" hidden><strong>준비중</strong><span>샘플 이미지를 준비하고 있어요.</span></div></div>`
      : `<div class="sample-media"><div class="sample-placeholder"><strong>준비중</strong><span>샘플 이미지를 준비하고 있어요.</span></div></div>`;
    return `<article class="sample-card">${media}<div class="sample-caption">${escapeHtml(row.title)}</div></article>`;
  }).join('') || '<div class="note-strip">이 카테고리의 샘플이 아직 없습니다.</div>';
}

function renderSample() {
  const rows = appState.data.sample;
  const categories = sampleCategories(rows);
  if (!appState.sampleCategory || !categories.includes(appState.sampleCategory)) appState.sampleCategory = categories[0] || '';
  const tabs = categories.map(category => `<button type="button" class="tab-button ${category === appState.sampleCategory ? 'is-active' : ''}" data-sample-tab="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  setSection('sample', `<div class="sample-tabs">${tabs}</div><div class="sample-stage"><div class="sample-grid">${sampleCardsMarkup(appState.sampleCategory)}</div></div>`);
}

function switchSampleCategory(category) {
  if (!category || category === appState.sampleCategory) return;
  const section = document.getElementById('sample');
  const stage = section?.querySelector('.sample-stage');
  const oldGrid = stage?.querySelector('.sample-grid');
  clearTimeout(appState.sampleSwitchTimer);
  appState.sampleCategory = category;

  section?.querySelectorAll('[data-sample-tab]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.sampleTab === category);
  });

  if (!stage || !oldGrid || motionReduced()) {
    if (oldGrid) oldGrid.innerHTML = sampleCardsMarkup(category);
    else renderSample();
    attachImageFallbacks(section);
    decorateMotion(section);
    applyCurrentViewport();
    sendHeight();
    return;
  }

  stage.getAnimations().forEach(animation => animation.cancel());
  oldGrid.getAnimations().forEach(animation => animation.cancel());
  stage.querySelectorAll('.sample-grid.is-sample-next').forEach(grid => grid.remove());

  const oldHeight = Math.max(1, Math.ceil(oldGrid.getBoundingClientRect().height));
  const nextGrid = document.createElement('div');
  nextGrid.className = 'sample-grid is-sample-next';
  nextGrid.innerHTML = sampleCardsMarkup(category);
  Object.assign(nextGrid.style, {
    position: 'absolute',
    inset: '0 0 auto 0',
    width: '100%',
    opacity: '0',
    pointerEvents: 'none'
  });

  stage.style.position = 'relative';
  stage.style.overflow = 'hidden';
  stage.style.height = `${oldHeight}px`;
  stage.appendChild(nextGrid);
  attachImageFallbacks(nextGrid);
  decorateMotion(nextGrid);

  requestAnimationFrame(() => {
    const nextHeight = Math.max(1, Math.ceil(nextGrid.scrollHeight));
    const easing = 'cubic-bezier(.22,1,.36,1)';
    const heightAnimation = stage.animate(
      [{ height: `${oldHeight}px` }, { height: `${nextHeight}px` }],
      { duration: 720, easing, fill: 'forwards' }
    );
    const outAnimation = oldGrid.animate(
      [
        { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' },
        { opacity: 0, transform: 'translate3d(0,-5px,0) scale(.998)' }
      ],
      { duration: 430, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
    );
    const inAnimation = nextGrid.animate(
      [
        { opacity: 0, transform: 'translate3d(0,8px,0) scale(.998)' },
        { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' }
      ],
      { duration: 660, delay: 100, easing, fill: 'forwards' }
    );

    const cleanup = () => {
      if (!nextGrid.isConnected) return;
      oldGrid.remove();
      nextGrid.classList.remove('is-sample-next');
      nextGrid.removeAttribute('style');
      stage.style.height = '';
      stage.style.overflow = '';
      stage.style.position = '';
      applyCurrentViewport();
      sendHeight();
    };

    Promise.allSettled([heightAnimation.finished, outAnimation.finished, inAnimation.finished]).then(cleanup);
    appState.sampleSwitchTimer = window.setTimeout(cleanup, 980);
  });
}
function processCategories(rows) {
  return [...new Set(rows.map(row => row.category).filter(Boolean))];
}

function processListMarkup(category) {
  return appState.data.process
    .filter(row => row.category === category)
    .sort((a, b) => numeric(a.step) - numeric(b.step))
    .map(row => `<div class="process-step"><span class="process-number">${String(row.step).padStart(2, '0')}</span><div class="process-content">${escapeHtml(row.content)}</div></div>`)
    .join('');
}

function renderProcess() {
  const rows = appState.data.process;
  const categories = processCategories(rows);
  if (!appState.processCategory || !categories.includes(appState.processCategory)) appState.processCategory = categories.includes('프리미엄') ? '프리미엄' : categories[0] || '';
  setSection('process', `
    <div class="process-tabs">${categories.map(category => `<button type="button" class="tab-button ${category === appState.processCategory ? 'is-active' : ''}" data-process-tab="${escapeHtml(category)}">${escapeHtml(category)} 리깅</button>`).join('')}</div>
    <div class="process-stage"><div class="process-list">${processListMarkup(appState.processCategory)}</div></div>
  `);
}

function switchProcessCategory(category) {
  if (!category || category === appState.processCategory) return;
  if (appState.processSwitchBusy) {
    appState.processPendingCategory = category;
    return;
  }

  const section = document.getElementById('process');
  const stage = section?.querySelector('.process-stage');
  const list = stage?.querySelector('.process-list');
  if (!stage || !list) {
    appState.processCategory = category;
    renderProcess();
    decorateMotion(section || document);
    applyCurrentViewport();
    sendHeight();
    return;
  }

  appState.processSwitchBusy = true;
  appState.processCategory = category;
  section.querySelectorAll('[data-process-tab]').forEach(button => {
    const active = button.dataset.processTab === category;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    button.disabled = true;
  });

  const finish = () => {
    appState.processSwitchBusy = false;
    section.querySelectorAll('[data-process-tab]').forEach(button => { button.disabled = false; });
    stage.style.height = '';
    stage.style.overflow = '';
    list.style.opacity = '';
    list.style.transform = '';
    applyCurrentViewport();
    sendHeight();
    const pending = appState.processPendingCategory;
    appState.processPendingCategory = '';
    if (pending && pending !== appState.processCategory) requestAnimationFrame(() => switchProcessCategory(pending));
  };

  const replaceContent = () => {
    list.innerHTML = processListMarkup(category);
    decorateMotion(list);
  };

  if (motionReduced()) {
    replaceContent();
    finish();
    return;
  }

  stage.getAnimations().forEach(animation => animation.cancel());
  list.getAnimations().forEach(animation => animation.cancel());
  const oldHeight = Math.max(1, Math.ceil(stage.getBoundingClientRect().height || list.getBoundingClientRect().height));
  stage.style.height = `${oldHeight}px`;
  stage.style.overflow = 'hidden';

  const outAnimation = list.animate(
    [
      { opacity: 1, transform: 'translate3d(0,0,0)' },
      { opacity: 0, transform: 'translate3d(-6px,0,0)' }
    ],
    { duration: 150, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
  );

  const finalizeIn = () => {
    replaceContent();
    const nextHeight = Math.max(1, Math.ceil(list.scrollHeight));
    list.style.opacity = '0';
    list.style.transform = 'translate3d(6px,0,0)';
    const heightAnimation = stage.animate(
      [{ height: `${oldHeight}px` }, { height: `${nextHeight}px` }],
      { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
    );
    const inAnimation = list.animate(
      [
        { opacity: 0, transform: 'translate3d(6px,0,0)' },
        { opacity: 1, transform: 'translate3d(0,0,0)' }
      ],
      { duration: 240, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }
    );
    Promise.allSettled([heightAnimation.finished, inAnimation.finished]).then(finish);
    window.setTimeout(finish, 340);
  };

  outAnimation.finished.then(finalizeIn).catch(finalizeIn);
}

function rightsTable() {
  const rows = appState.data.rights;
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const mark = value => value === '○' ? '<span class="rights-yes" aria-label="가능">○</span>' : value === '×' ? '<span class="rights-no" aria-label="불가"></span>' : escapeHtml(value);
  return `<div class="rights-table-wrap"><table class="rights-table"><thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${headers.map((header, index) => index === 0 ? `<th>${escapeHtml(row[header])}</th>` : `<td>${mark(row[header])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderNotice() {
  const rows = appState.data.notice.slice().sort((a, b) => numeric(a.order) - numeric(b.order));
  const content = rows.map((row, index) => {
    const rights = row.title.includes('저작권') || row.title.includes('사용 범위') ? rightsTable() : '';
    return `<article class="notice-item ${index === 0 ? 'is-open' : ''}">
      <button class="notice-summary" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span class="notice-icon" aria-hidden="true">${escapeHtml(row.icon || '✦')}</span><strong>${escapeHtml(row.title)}</strong><span class="notice-toggle"></span>
      </button>
      <div class="notice-body"><div class="notice-body-inner"><div class="rich-text">${formatRich(row.desc)}</div>${rights}</div></div>
    </article>`;
  }).join('');
  setSection('notice', `<div class="notice-list">${content || '<div class="note-strip">등록된 안내 사항이 없습니다.</div>'}</div>`);
}

function renderCollab() {
  const rows = appState.data.collab.filter(row => [row.nick, row.desc, row.benefit, row.link, row.img_url].some(value => String(value || '').trim()));
  if (!rows.length) {
    setSection('collab', `<div class="collab-empty-state" tabindex="0" aria-label="협업 작가 준비중"><span class="collab-empty-icon" aria-hidden="true">✦</span><div class="collab-empty-copy"><strong>협업 작가 준비중</strong><span>새로운 협업 작가 정보를 정리하고 있습니다.</span></div><span class="collab-empty-badge">COMING SOON</span></div>`);
    return;
  }
  const content = `<div class="collab-grid">${rows.map(row => {
    const img = driveImage(row.img_url);
    const inner = `<div class="collab-thumb">${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(row.nick || '협업 작가')} 프로필 이미지" loading="lazy" decoding="async" data-image-fallback>` : `<div class="collab-thumb-empty"><span>✦</span></div>`}</div><div><h3>${escapeHtml(row.nick || '협업 작가')}</h3><div class="collab-desc">${formatInline(row.desc || '')}</div>${row.benefit ? `<span class="collab-benefit">리깅 ${won(numeric(row.benefit))} 할인</span>` : ''}</div>`;
    return row.link ? `<a class="collab-card" href="${escapeHtml(row.link)}" target="_blank" rel="noopener noreferrer">${inner}</a>` : `<div class="collab-card">${inner}</div>`;
  }).join('')}</div>`;
  setSection('collab', content);
}

function packageOptions() {
  const rows = appState.data.package;
  const keys = packageKeys(rows);
  const names = packageRow(rows, '패키지명');
  const prices = packageRow(rows, '기본 가격');
  return keys.map(key => ({ key, name: names[key] || key, price: numeric(prices[key]) }));
}

function pricedAddons() {
  return appState.data.addon.filter(row => ['add', 'unit'].includes(row.type) && numeric(row.price) > 0);
}

function optionId(title) {
  return `opt-${String(title).normalize('NFKD').replace(/[^a-zA-Z0-9가-힣]+/g, '-').replace(/^-|-$/g, '')}`;
}

function formOptionMarkup(row) {
  const id = `form-${optionId(row.title)}`;
  if (row.type === 'unit') {
    if (!(row.title in appState.formQty)) appState.formQty[row.title] = 0;
    return `<div class="choice-card quantity-choice"><span class="choice-mark choice-mark-static">+</span><span class="choice-copy"><strong>${escapeHtml(row.title)}</strong><small>${escapeHtml(displayPackagePrice(row.price))} / 개</small></span><div class="qty-control"><button type="button" data-form-qty-minus="${escapeHtml(row.title)}" aria-label="${escapeHtml(row.title)} 수량 감소">−</button><output data-form-qty="${escapeHtml(row.title)}" data-price="${numeric(row.price)}">${appState.formQty[row.title]}</output><button type="button" data-form-qty-plus="${escapeHtml(row.title)}" aria-label="${escapeHtml(row.title)} 수량 증가">+</button></div></div>`;
  }
  return `<label class="choice-card"><input type="checkbox" id="${escapeHtml(id)}" data-form-addon="${escapeHtml(row.title)}" data-price="${numeric(row.price)}" data-type="${escapeHtml(row.type)}"><span class="choice-mark" aria-hidden="true"></span><span class="choice-copy"><strong>${escapeHtml(row.title)}</strong><small>${escapeHtml(displayPackagePrice(row.price))}</small></span></label>`;
}

function closeCustomSelects(except = null) {
  document.querySelectorAll('.custom-select.is-open').forEach(wrapper => {
    if (wrapper === except) return;
    wrapper.classList.remove('is-open', 'opens-up');
    const trigger = wrapper.querySelector('.custom-select-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

function syncCustomSelects(root = document) {
  root.querySelectorAll('.custom-select').forEach(wrapper => {
    const select = wrapper.previousElementSibling;
    if (!select || select.tagName !== 'SELECT') return;
    const value = wrapper.querySelector('.custom-select-value');
    const options = [...wrapper.querySelectorAll('.custom-select-option')];
    const current = select.options[select.selectedIndex];
    if (value) value.textContent = current ? current.textContent : '';
    options.forEach((option, index) => {
      const selected = index === select.selectedIndex;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-selected', String(selected));
    });
  });
}

function enhanceCustomSelects(root = document) {
  root.querySelectorAll('select.select-input:not([data-custom-enhanced])').forEach(select => {
    select.dataset.customEnhanced = 'true';
    select.classList.add('native-select-hidden');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    const triggerId = `${select.id || 'custom-select'}-trigger`;
    const menuId = `${select.id || 'custom-select'}-menu`;
    wrapper.innerHTML = `<button type="button" id="${escapeHtml(triggerId)}" class="custom-select-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="${escapeHtml(menuId)}"><span class="custom-select-value"></span><span class="custom-select-arrow" aria-hidden="true"></span></button><div id="${escapeHtml(menuId)}" class="custom-select-menu" role="listbox">${[...select.options].map((option, index) => `<button type="button" class="custom-select-option" role="option" data-select-index="${index}" aria-selected="false"><span>${escapeHtml(option.textContent)}</span><i aria-hidden="true"></i></button>`).join('')}</div>`;
    select.insertAdjacentElement('afterend', wrapper);
    const label = select.id ? document.querySelector(`label[for="${CSS.escape(select.id)}"]`) : null;
    if (label) label.htmlFor = triggerId;
    const trigger = wrapper.querySelector('.custom-select-trigger');
    trigger.addEventListener('click', () => {
      const opening = !wrapper.classList.contains('is-open');
      closeCustomSelects(opening ? wrapper : null);
      wrapper.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', String(opening));
      if (opening) {
        const menu = wrapper.querySelector('.custom-select-menu');
        const rect = wrapper.getBoundingClientRect();
        const menuHeight = Math.max(120, menu.scrollHeight || 0);
        const visibleTop = appState.parentViewport?.visibleTop ?? 0;
        const visibleBottom = appState.parentViewport?.visibleBottom ?? window.innerHeight;
        const shouldOpenUp = rect.bottom + menuHeight + 14 > visibleBottom && rect.top - menuHeight - 14 > visibleTop;
        wrapper.classList.toggle('opens-up', shouldOpenUp);
      }
    });
    wrapper.addEventListener('click', event => {
      const option = event.target.closest('.custom-select-option');
      if (!option) return;
      select.selectedIndex = Number(option.dataset.selectIndex) || 0;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      syncCustomSelects(wrapper.parentElement || document);
      closeCustomSelects();
      trigger.focus();
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        if (!wrapper.classList.contains('is-open')) {
          event.preventDefault();
          trigger.click();
        }
      }
    });
    select.addEventListener('change', () => syncCustomSelects(wrapper.parentElement || document));
  });
  if (!document.documentElement.dataset.customSelectBound) {
    document.documentElement.dataset.customSelectBound = 'true';
    document.addEventListener('pointerdown', event => {
      if (!event.target.closest('.custom-select')) closeCustomSelects();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeCustomSelects();
    });
  }
  syncCustomSelects(root);
}

function renderForm() {
  const packages = packageOptions();
  const addons = pricedAddons();
  const consult = appState.data.addon.filter(row => row.type === 'etc');
  setSection('form', `
    <div class="form-shell">
      <div class="form-grid">
        <div class="field"><label for="formNick">활동명</label><input id="formNick" class="text-input" type="text" autocomplete="name" placeholder="방송 / 활동에 사용하는 이름"></div>
        <div class="field"><label for="formPlatform">플랫폼</label><input id="formPlatform" class="text-input" type="text" placeholder="예: 치지직 / SOOP / YouTube"></div>
        <div class="field"><label for="formDebut">데뷔 예정일</label><input id="formDebut" class="text-input" type="date"></div>
        <div class="field"><label for="formOpen">작업물 SNS 공개 여부</label><select id="formOpen" class="select-input"><option value="공개 가능">공개 가능</option><option value="비공개 요청">비공개 요청</option></select></div>
        <div class="field"><label for="formArtist">일러스트 작가님 닉네임</label><input id="formArtist" class="text-input" type="text" placeholder="작가님 닉네임"></div>
        <div class="field"><label for="formTracking">트래킹 장비</label><select id="formTracking" class="select-input"><option value="아이폰">아이폰</option><option value="웹캠">웹캠</option><option value="기타 / 미정">기타 / 미정</option></select></div>
        <div class="field"><label for="formEye">아이폰 사용 시 놀란 눈</label><select id="formEye" class="select-input"><option value="해당 없음">해당 없음</option><option value="눈동자 작게">눈동자 작게</option><option value="눈동자 많이 작게">눈동자 많이 작게</option></select></div>
        <div class="field"><label for="formBenefit">할인 혜택</label><select id="formBenefit" class="select-input"><option value="none">적용 안 함</option><option value="review">후기 작성 · 50,000원 할인</option><option value="collab">협업 작가 · 50,000원 할인</option><option value="both">후기 + 협업 · 100,000원 할인</option></select></div>
        <div class="field full package-choice-field"><span class="field-label">신청 타입</span><span class="field-note">원하는 리깅 타입을 선택해 주세요.</span><div class="package-choice-grid">${packages.map((p, index) => `<label class="package-choice-card"><input type="radio" name="formPackage" value="${escapeHtml(p.key)}" data-package-name="${escapeHtml(p.name)}" data-price="${p.price}" ${index === 0 ? 'checked' : ''}><span class="package-choice-mark" aria-hidden="true"></span><span class="package-choice-copy"><strong>${escapeHtml(p.name)}</strong><small>기본가 ${won(p.price)}+</small></span></label>`).join('')}</div></div>
        <div class="field full"><span class="field-label">추가 옵션</span><span class="field-note">여기서 선택한 옵션과 수량이 아래 예상 견적에 바로 반영됩니다.</span><div class="choice-grid">${addons.map(formOptionMarkup).join('')}</div></div>
        <div class="field full"><label class="choice-card single-choice"><input id="formCopyright" type="checkbox"><span class="choice-mark" aria-hidden="true"></span><span class="choice-copy"><strong>저작권 구매</strong><small>할인 적용 후 작업 금액의 +40%</small></span></label></div>
        <div class="field full"><label for="formExtra">추가 옵션 / 특수 파츠</label><textarea id="formExtra" class="textarea-input" placeholder="${escapeHtml(consult.map(row => row.title).join(' / '))}
선택 항목에 없는 특수 파츠나 별도 상담이 필요한 내용을 적어 주세요."></textarea></div>
        <div class="field full"><label for="formRequest">요청 사항</label><textarea id="formRequest" class="textarea-input" placeholder="특별히 신경 쓸 부분이나 제외할 움직임, 추가 요청 사항을 적어 주세요."></textarea></div>
        <div class="field full"><label class="choice-card single-choice"><input id="formGuide" type="checkbox"><span class="choice-mark" aria-hidden="true"></span><span class="choice-copy"><strong>가이드 확인</strong><small>캐릭터 가이드 이미지가 없는 경우 임의 작업에 동의합니다.</small></span></label></div>
      </div>
      <aside class="estimate-card form-estimate-card">
        <div class="estimate-head"><span>ESTIMATED COST</span><div id="estimateTotal" class="estimate-total">0원+</div></div>
        <div id="estimateList" class="estimate-list"></div>
        <div class="estimate-note">계산 결과는 안내용 예상 금액입니다. 실제 견적은 PSD 구조, 캐릭터 복잡도, 별도 상담 옵션 및 특수 작업 확인 후 확정됩니다.</div>
      </aside>
      <div class="calc-consult"><strong>별도 상담 항목</strong><br>${consult.map(row => escapeHtml(row.title)).join(' / ')}<br>위 항목은 자동 계산에 포함되지 않습니다.</div>
      <div class="form-actions"><button id="formReset" type="button" class="action-button">초기화</button><button id="formCopy" type="button" class="action-button primary">신청 양식 복사</button></div>
    </div>
  `);
  enhanceCustomSelects(document.getElementById('form') || document);
  updateFormEstimate();
}

function benefitDiscount(code) {
  if (code === 'review' || code === 'collab') return 50000;
  if (code === 'both') return 100000;
  return 0;
}

function updateFormEstimate() {
  const packageInput = document.querySelector('input[name="formPackage"]:checked');
  const totalEl = document.getElementById('estimateTotal');
  const listEl = document.getElementById('estimateList');
  if (!packageInput || !totalEl || !listEl) return;
  const packageName = packageInput.dataset.packageName || '패키지';
  let subtotal = numeric(packageInput.dataset.price);
  const lines = [{ label: packageName, value: subtotal }];
  document.querySelectorAll('[data-form-addon]:checked').forEach(input => {
    const price = numeric(input.dataset.price);
    subtotal += price;
    lines.push({ label: input.dataset.formAddon || '추가 옵션', value: price });
  });
  document.querySelectorAll('[data-form-qty]').forEach(output => {
    const qty = Math.max(0, numeric(output.textContent));
    const price = numeric(output.dataset.price);
    const title = output.dataset.formQty || '수량 옵션';
    appState.formQty[title] = qty;
    if (qty > 0) {
      const value = qty * price;
      subtotal += value;
      lines.push({ label: `${title} × ${qty}`, value });
    }
  });
  const benefit = document.getElementById('formBenefit')?.value || 'none';
  const discount = Math.min(subtotal, benefitDiscount(benefit));
  const discounted = subtotal - discount;
  const copyrightFee = document.getElementById('formCopyright')?.checked ? Math.round(discounted * 0.4) : 0;
  const total = discounted + copyrightFee;
  animateEstimateTotal(totalEl, total);
  const signature = JSON.stringify({ lines, discount, copyrightFee, total });
  if (listEl.dataset.estimateSignature === signature) return;
  listEl.dataset.estimateSignature = signature;
  const lineHtml = lines.map(line => `<div class="estimate-row"><span>${escapeHtml(line.label)}</span><strong>+ ${won(line.value)}</strong></div>`).join('');
  const discountHtml = discount ? `<div class="estimate-row discount"><span>혜택 할인</span><strong>− ${won(discount)}</strong></div>` : '';
  const copyrightHtml = copyrightFee ? `<div class="estimate-row"><span>저작권 구매 +40%</span><strong>+ ${won(copyrightFee)}</strong></div>` : '';
  listEl.innerHTML = `${lineHtml}${discountHtml || copyrightHtml ? '<div class="estimate-divider"></div>' : ''}${discountHtml}${copyrightHtml}<div class="estimate-divider"></div><div class="estimate-row estimate-final"><span>예상 합계</span><strong>${won(total)}+</strong></div>`;
  sendHeight();
}


function motionReduced() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
}

function animateEstimateTotal(el, target) {
  if (!el) return;
  const next = Math.max(0, numeric(target));
  const previous = Number.isFinite(Number(el.dataset.motionAmount)) ? Number(el.dataset.motionAmount) : numeric(el.textContent);
  el.dataset.motionAmount = String(next);
  if (motionReduced() || previous === next) {
    el.textContent = `${won(next)}+`;
    return;
  }
  if (el._motionFrame) cancelAnimationFrame(el._motionFrame);
  const started = performance.now();
  const duration = 560;
  el.classList.add('is-counting');
  const ease = t => 1 - Math.pow(1 - t, 4);
  const tick = now => {
    const progress = Math.min(1, (now - started) / duration);
    const value = Math.round(previous + (next - previous) * ease(progress));
    el.textContent = `${won(value)}+`;
    if (progress < 1) {
      el._motionFrame = requestAnimationFrame(tick);
    } else {
      el.textContent = `${won(next)}+`;
      el.classList.remove('is-counting');
      el._motionFrame = null;
    }
  };
  el._motionFrame = requestAnimationFrame(tick);
}

function decorateMotion(root = document) {
  if (motionReduced()) return;
  const cardSelector = '.event-card, .sample-card, .process-step, .addon-card, .collab-card:not(.is-disabled), .scope-row, .package-card, .notice-item';
  root.querySelectorAll(cardSelector).forEach(card => {
    if (card.dataset.motionBound) return;
    card.dataset.motionBound = '1';
    card.classList.add('motion-card');

    const glow = document.createElement('span');
    glow.className = 'motion-glow';
    glow.setAttribute('aria-hidden', 'true');
    card.appendChild(glow);

    const state = {
      rect: null,
      clientX: 0,
      clientY: 0,
      raf: 0
    };

    const renderPointer = () => {
      state.raf = 0;
      const rect = state.rect;
      if (!rect) return;
      const x = state.clientX - rect.left;
      const y = state.clientY - rect.top;
      glow.style.transform = `translate3d(${x - 110}px, ${y - 110}px, 0)`;
    };

    const queuePointer = event => {
      state.clientX = event.clientX;
      state.clientY = event.clientY;
      if (!state.raf) state.raf = requestAnimationFrame(renderPointer);
    };

    card.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      state.rect = card.getBoundingClientRect();
      card.classList.add('is-motion-hover');
      queuePointer(event);
    }, { passive: true });

    card.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      if (!state.rect) state.rect = card.getBoundingClientRect();
      queuePointer(event);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      state.rect = null;
      card.classList.remove('is-motion-hover');
    }, { passive: true });
  });
}

function setupPremiumMotion() {
  if (document.documentElement.dataset.premiumMotionBound) return;
  document.documentElement.dataset.premiumMotionBound = '1';
  decorateMotion();

  const hero = document.querySelector('.hero');
  if (hero && !motionReduced()) {
    let heroFrame = 0;
    hero.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      cancelAnimationFrame(heroFrame);
      heroFrame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(1, rect.width) - .5) * 26;
        const y = ((event.clientY - rect.top) / Math.max(1, rect.height) - .5) * 18;
        hero.style.setProperty('--hero-x', `${x.toFixed(1)}px`);
        hero.style.setProperty('--hero-y', `${y.toFixed(1)}px`);
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hero-x', '0px');
      hero.style.setProperty('--hero-y', '0px');
    });
  }

  document.addEventListener('pointerdown', event => {
    const target = event.target.closest('.action-button, .tab-button, .icon-button, .qty-control button');
    if (!target || motionReduced()) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'motion-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    target.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
  });

  const mutationRoot = document.getElementById('sections');
  if (mutationRoot) {
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        decorateMotion(node.matches?.('.event-card, .sample-card, .process-step, .addon-card, .collab-card, .scope-row, .package-card, .notice-item') ? node.parentElement || node : node);
      }));
    });
    observer.observe(mutationRoot, { childList: true, subtree: true });
  }
}

function buildFormText() {
  const get = id => document.getElementById(id)?.value?.trim() || '';
  const packageInput = document.querySelector('input[name="formPackage"]:checked');
  const packageName = packageInput?.dataset.packageName || '';
  const addons = [...document.querySelectorAll('[data-form-addon]:checked')].map(input => input.dataset.formAddon).filter(Boolean);
  document.querySelectorAll('[data-form-qty]').forEach(output => {
    const qty = Math.max(0, numeric(output.textContent));
    if (qty > 0) addons.push(`${output.dataset.formQty} × ${qty}`);
  });
  const benefitMap = { none: '적용 안 함', review: '후기 작성', collab: '협업 작가', both: '후기 작성 + 협업 작가' };
  const guide = document.getElementById('formGuide')?.checked ? '동의합니다.' : '미동의 / 확인 필요';
  const copyright = document.getElementById('formCopyright')?.checked ? '구매 희망' : '구매하지 않음';
  return [
    `[Live2D 리깅 신청 양식]`,
    `활동명: ${get('formNick')}`,
    `플랫폼: ${get('formPlatform')}`,
    `데뷔 예정일: ${get('formDebut')}`,
    `작업물 SNS 공개 가능 여부 / 비공개 요청: ${get('formOpen')}`,
    `일러스트 작가님 닉네임: ${get('formArtist')}`,
    `신청 타입: ${packageName}`,
    `트래킹 장비 여부: ${get('formTracking')}`,
    `아이폰 사용 시 놀란 눈 선택: ${get('formEye')}`,
    `할인 혜택: ${benefitMap[get('formBenefit')] || get('formBenefit')}`,
    `추가 옵션: ${addons.length ? addons.join(' / ') : '없음'}`,
    `저작권 구매: ${copyright}`,
    `예상 견적: ${document.getElementById('estimateTotal')?.textContent || '확인 필요'}`,
    `선택 옵션에 없는 항목 / 특수 파츠: ${get('formExtra') || '없음'}`,
    `요청 사항: ${get('formRequest') || '없음'}`,
    `가이드 확인: 저는 캐릭터의 가이드 이미지가 없는 경우, 임의 작업에 ${guide}`,
    `PSD 파일: 문의 시 첨부 예정`
  ].join('\n');
}

function copyTextWithoutFocus(text) {
  const holder = document.createElement('span');
  holder.textContent = text;
  holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;white-space:pre;';
  document.body.appendChild(holder);
  const selection = window.getSelection();
  const savedRanges = [];
  if (selection) {
    for (let index = 0; index < selection.rangeCount; index += 1) savedRanges.push(selection.getRangeAt(index).cloneRange());
  }
  const range = document.createRange();
  range.selectNodeContents(holder);
  selection?.removeAllRanges();
  selection?.addRange(range);
  let copied = false;
  try { copied = document.execCommand('copy'); } catch {}
  selection?.removeAllRanges();
  savedRanges.forEach(saved => selection?.addRange(saved));
  holder.remove();
  return copied;
}

async function copyForm() {
  const text = buildFormText();
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch {}
  if (!copied) copied = copyTextWithoutFocus(text);
  showToast(copied ? '신청 양식을 복사했습니다.' : '복사에 실패했습니다. 다시 시도해 주세요.');
}

function resetForm() {
  const formIds = ['formNick', 'formPlatform', 'formDebut', 'formArtist', 'formExtra', 'formRequest'];
  formIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['formOpen', 'formTracking', 'formEye', 'formBenefit'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
  const packageInputs = [...document.querySelectorAll('input[name="formPackage"]')];
  packageInputs.forEach((input, index) => { input.checked = index === 0; });
  document.querySelectorAll('[data-form-addon]').forEach(input => { input.checked = false; });
  document.querySelectorAll('[data-form-qty]').forEach(output => {
    output.textContent = '0';
    appState.formQty[output.dataset.formQty] = 0;
  });
  ['formGuide', 'formCopyright'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  syncCustomSelects(document.getElementById('form') || document);
  updateFormEstimate();
  showToast('신청 양식을 초기화했습니다.');
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll('[data-image-fallback], [data-sample-image]').forEach(img => {
    if (img.dataset.boundFallback) return;
    img.dataset.boundFallback = '1';
    img.dataset.imageAttempt = '0';
    img.addEventListener('error', () => {
      const source = img.dataset.imageSource || img.getAttribute('src') || '';
      const candidates = driveImageCandidates(source);
      const nextAttempt = numeric(img.dataset.imageAttempt) + 1;
      if (nextAttempt < candidates.length) {
        img.dataset.imageAttempt = String(nextAttempt);
        img.src = candidates[nextAttempt];
        return;
      }
      img.hidden = true;
      const sibling = img.nextElementSibling;
      if (sibling) sibling.hidden = false;
      sendHeight();
    });
    img.addEventListener('load', () => {
      img.hidden = false;
      const sibling = img.nextElementSibling;
      if (sibling && (sibling.classList.contains('sample-placeholder') || sibling.classList.contains('profile-photo-fallback') || sibling.classList.contains('collab-avatar-fallback'))) sibling.hidden = true;
      sendHeight();
    });
  });
}

function syncImageModalViewport(viewport = appState.parentViewport) {
  if (!els.imageModal || els.imageModal.hidden || window.parent === window) return;
  const top = Math.max(0, Number(viewport?.visibleTop) || 0);
  const fallbackHeight = Math.max(320, Number(viewport?.viewportHeight) || 700);
  const bottom = Math.max(top + 220, Number(viewport?.visibleBottom) || top + fallbackHeight);
  els.imageModal.style.setProperty('--modal-top', `${Math.round(top)}px`);
  els.imageModal.style.setProperty('--modal-height', `${Math.round(bottom - top)}px`);
}

function openImageModal(img) {
  if (!img || !els.imageModal || !els.imageModalImg) return;
  els.imageModalImg.src = img.currentSrc || img.src;
  els.imageModalImg.alt = img.alt || '리깅 디테일 이미지';
  if (els.imageModalCaption) {
    const caption = img.closest('.sample-card')?.querySelector('.sample-caption')?.textContent?.trim() || img.alt || '';
    els.imageModalCaption.textContent = caption;
  }
  els.imageModal.hidden = false;
  els.imageModal.setAttribute('aria-hidden', 'false');
  syncImageModalViewport();
  if (window.parent !== window) window.parent.postMessage({ type: 'artmugPortfolio:requestViewport' }, '*');
  requestAnimationFrame(() => els.imageModal.querySelector('[data-image-modal-close]')?.focus({ preventScroll: true }));
}

function closeImageModal() {
  if (!els.imageModal || els.imageModal.hidden) return;
  els.imageModal.hidden = true;
  els.imageModal.setAttribute('aria-hidden', 'true');
  if (els.imageModalImg) {
    els.imageModalImg.removeAttribute('src');
    els.imageModalImg.alt = '';
  }
  if (els.imageModalCaption) els.imageModalCaption.textContent = '';
}

function bindEvents() {
  document.addEventListener('click', event => {
    const modalClose = event.target.closest('[data-image-modal-close]');
    if (modalClose || event.target === els.imageModal) {
      closeImageModal();
      return;
    }
    const sampleImage = event.target.closest('#sample [data-sample-image]');
    if (sampleImage) {
      openImageModal(sampleImage);
      return;
    }
    const quickTarget = event.target.closest('[data-quick-target]');
    if (quickTarget) {
      scrollToSection(quickTarget.dataset.quickTarget);
      return;
    }
    const sampleTab = event.target.closest('[data-sample-tab]');
    if (sampleTab) {
      switchSampleCategory(sampleTab.dataset.sampleTab);
      return;
    }
    const processTab = event.target.closest('[data-process-tab]');
    if (processTab) {
      switchProcessCategory(processTab.dataset.processTab);
      return;
    }
    const prev = event.target.closest('[data-calendar-prev]');
    if (prev) {
      appState.calendarMonth = new Date(appState.calendarMonth.getFullYear(), appState.calendarMonth.getMonth() - 1, 1);
      renderCalendar();
      sendHeight();
      return;
    }
    const next = event.target.closest('[data-calendar-next]');
    if (next) {
      appState.calendarMonth = new Date(appState.calendarMonth.getFullYear(), appState.calendarMonth.getMonth() + 1, 1);
      renderCalendar();
      sendHeight();
      return;
    }
    const notice = event.target.closest('.notice-summary');
    if (notice) {
      const item = notice.closest('.notice-item');
      const open = item.classList.toggle('is-open');
      notice.setAttribute('aria-expanded', String(open));
      syncHeightDuringAnimation();
      return;
    }
    const formMinus = event.target.closest('[data-form-qty-minus]');
    if (formMinus) {
      const key = formMinus.dataset.formQtyMinus;
      const output = [...document.querySelectorAll('[data-form-qty]')].find(el => el.dataset.formQty === key);
      if (output) output.textContent = String(Math.max(0, numeric(output.textContent) - 1));
      updateFormEstimate();
      return;
    }
    const formPlus = event.target.closest('[data-form-qty-plus]');
    if (formPlus) {
      const key = formPlus.dataset.formQtyPlus;
      const output = [...document.querySelectorAll('[data-form-qty]')].find(el => el.dataset.formQty === key);
      if (output) output.textContent = String(Math.min(99, numeric(output.textContent) + 1));
      updateFormEstimate();
      return;
    }
    const copyButton = event.target.closest('#formCopy');
    if (copyButton) {
      event.preventDefault();
      copyForm();
      return;
    }
    const resetButton = event.target.closest('#formReset');
    if (resetButton) {
      event.preventDefault();
      resetForm();
      return;
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && els.imageModal && !els.imageModal.hidden) {
      closeImageModal();
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.('#sample [data-sample-image]')) {
      event.preventDefault();
      openImageModal(event.target);
    }
  });

  document.addEventListener('change', event => {
    if (event.target.matches('input[name="formPackage"]') || event.target.id === 'formBenefit' || event.target.id === 'formCopyright' || event.target.matches('[data-form-addon]')) updateFormEstimate();
  });

}

function applySectionOrder() {
  const ordered = appState.data.meta
    .filter(item => item.id && item.id !== 'top')
    .sort((a, b) => numeric(a.order) - numeric(b.order));
  ordered.forEach(item => {
    const section = document.getElementById(item.id);
    if (section) els.sections.appendChild(section);
  });
}

function renderAll() {
  renderTop();
  renderIntro();
  renderEvent();
  renderCalendar();
  renderPackage();
  renderScope();
  renderAddon();
  renderSample();
  renderProcess();
  renderNotice();
  renderCollab();
  renderForm();
  applySectionOrder();
  attachImageFallbacks();
  updateFormEstimate();
  refreshRevealTargets();
  setupPremiumMotion();
  decorateMotion();
  requestAnimationFrame(() => {
    requestAnimationFrame(applyCurrentViewport);
  });
}

function revealSelector() {
  return '.hero, .content-section, .profile-card, .event-card, .calendar-panel, .package-card, .package-table-wrap, .scope-row, .note-strip, .addon-card, .sample-tabs, .sample-card, .process-tabs, .process-step, .notice-item, .collab-card, .form-shell, .page-footer';
}

function refreshRevealTargets() {
  const targets = [...document.querySelectorAll(revealSelector())];
  const sectionCounts = new Map();
  targets.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    const section = el.closest('.content-section');
    if (section && el !== section) {
      const count = sectionCounts.get(section) || 0;
      sectionCounts.set(section, count + 1);
      el.style.setProperty('--reveal-delay', `${Math.min(count, 5) * 34}ms`);
    } else {
      el.style.setProperty('--reveal-delay', '0ms');
    }
    if (!el.dataset.revealDirection && !el.classList.contains('content-section') && !el.classList.contains('hero')) {
      if (index % 6 === 2) el.dataset.revealDirection = 'left';
      if (index % 6 === 5) el.dataset.revealDirection = 'right';
    }
  });
  if (window.parent === window && !appState.standaloneObserver) {
    appState.standaloneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-revealed', entry.isIntersecting));
    }, { root: null, threshold: 0.08, rootMargin: '-4% 0px -6% 0px' });
  }
  if (window.parent === window && appState.standaloneObserver) targets.forEach(el => appState.standaloneObserver.observe(el));
}

function updateQuickMenu(viewport) {
  if (!els.quickNav || !viewport) return;
  const navHeight = els.quickNav.offsetHeight || 0;
  const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const preferred = Math.max(120, viewport.visibleTop + 72);
  const maxTop = Math.max(120, docHeight - navHeight - 38);
  els.quickNav.style.top = `${Math.min(preferred, maxTop)}px`;
  els.quickNav.style.setProperty('--parent-viewport-height', `${Math.max(320, viewport.viewportHeight || 700)}px`);
}

function updateQuickActive() {}

function applyParentViewport(viewport) {
  if (!viewport) return;
  appState.parentViewport = viewport;
  syncImageModalViewport(viewport);
  updateQuickMenu(viewport);
  if (appState.revealViewportFrame) cancelAnimationFrame(appState.revealViewportFrame);
  appState.revealViewportFrame = requestAnimationFrame(() => {
    appState.revealViewportFrame = 0;
    const current = appState.parentViewport;
    if (!current) return;
    const top = Number(current.visibleTop) || 0;
    const bottom = Number(current.visibleBottom) || 0;
    const margin = Math.min(64, Math.max(18, (bottom - top) * 0.07));
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      const visible = bottom > top && rect.bottom > top + margin && rect.top < bottom - margin;
      el.classList.toggle('is-revealed', visible);
    });
  });
}

function applyCurrentViewport() {
  if (window.parent === window) return;
  if (appState.parentViewport) applyParentViewport(appState.parentViewport);
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY - 18;
  if (window.parent === window) {
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  } else {
    window.parent.postMessage({ type: 'artmugPortfolio:scrollTo', offset: Math.max(0, top) }, '*');
  }
}

function setupParentPointerBridge() {
  if (window.parent === window || document.documentElement.dataset.parentPointerBound) return;
  document.documentElement.dataset.parentPointerBound = '1';
  let frame = 0;
  let x = 0;
  let y = 0;
  const send = () => {
    frame = 0;
    window.parent.postMessage({ type: 'artmugPortfolio:pointer', x, y }, '*');
  };
  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    x = event.clientX;
    y = event.clientY;
    if (!frame) frame = requestAnimationFrame(send);
  }, { passive: true });
  document.addEventListener('pointerout', event => {
    if (!event.relatedTarget) window.parent.postMessage({ type: 'artmugPortfolio:pointerleave' }, '*');
  }, { passive: true });
  window.addEventListener('blur', () => window.parent.postMessage({ type: 'artmugPortfolio:pointerleave' }, '*'));
}

function setupParentViewportBridge() {
  if (window.parent === window) return;
  window.addEventListener('message', event => {
    if (event.source !== window.parent) return;
    const data = event.data || {};
    if (data.type === 'artmugPortfolio:viewport') {
      const frameTop = Number(data.frameTop) || 0;
      const frameHeight = Number(data.frameHeight) || document.documentElement.scrollHeight;
      const viewportHeight = Number(data.viewportHeight) || 0;
      const sticky = Number(data.stickyOffset) || 0;
      const visibleTop = Number.isFinite(Number(data.visibleTop)) ? Number(data.visibleTop) : Math.max(0, sticky - frameTop);
      const visibleBottom = Number.isFinite(Number(data.visibleBottom)) ? Number(data.visibleBottom) : Math.max(visibleTop, Math.min(frameHeight, viewportHeight - frameTop));
      applyParentViewport({ visibleTop, visibleBottom, viewportHeight });
    }
    if (data.type === 'artmugPortfolio:requestHeight') sendHeight();
    if (data.type === 'artmugPortfolio:navigate' && data.id) scrollToSection(String(data.id));
  });
  window.parent.postMessage({ type: 'artmugPortfolio:requestViewport' }, '*');
  window.setTimeout(() => {
    if (!appState.parentViewport) document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-revealed'));
  }, 1200);
}

let heightSyncFrame = 0;

function sendHeight() {
  if (window.parent === window || heightSyncFrame) return;
  heightSyncFrame = requestAnimationFrame(() => {
    heightSyncFrame = 0;
    const app = document.getElementById('app');
    const height = app ? Math.ceil(app.getBoundingClientRect().height) : Math.ceil(document.body.getBoundingClientRect().height);
    window.parent.postMessage({ type: 'artmugPortfolio:height', height }, '*');
  });
}

function syncHeightDuringAnimation(duration = 720) {
  if (window.parent === window) return;
  const started = performance.now();
  const tick = now => {
    sendHeight();
    if (now - started < duration) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  window.setTimeout(sendHeight, duration + 40);
}

function setupAutoHeight() {
  const target = document.getElementById('app') || document.body;
  const observer = new ResizeObserver(() => sendHeight());
  observer.observe(target);
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  if (document.fonts?.ready) document.fonts.ready.then(sendHeight);
}

function prepareInitialData() {
  const cached = readSheetCache();
  appState.data = cloneFallback();
  if (!cached) return;

  Object.keys(SHEETS).forEach(key => {
    if (Array.isArray(cached[key]) && cached[key].length) {
      appState.data[key] = cached[key];
    }
  });
}

async function refreshDataInBackground() {
  const entries = Object.entries(SHEETS);
  const settled = await Promise.allSettled(entries.map(([, url]) => fetchCsv(url)));
  const nextData = { ...appState.data };
  const failed = [];
  let changed = false;

  settled.forEach((result, index) => {
    const key = entries[index][0];
    if (result.status === 'fulfilled' && Array.isArray(result.value) && result.value.length) {
      nextData[key] = result.value;
      changed = true;
    } else {
      failed.push(key);
    }
  });

  appState.failed = failed;
  appState.data = nextData;
  if (changed) {
    writeSheetCache(nextData);
    renderAll();
    sendHeight();
  }
  els.error.hidden = failed.length === 0;
}

function init() {
  bindEvents();
  setupParentViewportBridge();
  setupAutoHeight();

  // Never block the page on Google Sheets. Show cached/default content first,
  // then refresh the latest sheet data after the first paint.
  prepareInitialData();
  renderAll();
  els.loading.hidden = true;
  els.sections.hidden = false;
  els.error.hidden = true;
  sendHeight();

  window.setTimeout(() => {
    refreshDataInBackground().catch(() => {
      els.error.hidden = false;
    });
  }, 0);
}

init();
