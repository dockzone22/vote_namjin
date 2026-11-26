/* 반복 콘텐츠 수정: 배열에 항목을 추가하거나 삭제하면 화면에 반영됩니다.
   실제 자료가 확정되기 전까지 자리표시자를 유지하세요. */
window.SITE_DATA = {
  menu: [
    { id: 'why', label: '왜 남진인가?' },
    { id: 'journey', label: '걸어온 길' },
    { id: 'pledges', label: '7대 대표공약' },
    { id: 'campus', label: '캠퍼스 환경개선' },
    { id: 'cardnews', label: '공약 카드뉴스' },
    { id: 'downloads', label: '파일 받기' },
    { id: 'archive', label: '아카이브' }
  ],
  // 대표 영상: 향후 영상 파일 경로(HTTPS URL 또는 상대경로)를 입력하면 비디오로 전환됩니다.
  heroVideo: {
    src: '',
    poster: '',
    title: '남진 총장 후보 대표 영상'
  },
  // 왜 남진인가? 3개 분야
  why: [
    { id: 'seoul', title: '서울시', description: '[서울시 관련 경력 및 설명]' },
    { id: 'public', title: '공공기관', description: '[공공기관 관련 경력 및 설명]' },
    { id: 'uos', title: '서울시립대', description: '[서울시립대 관련 경력 및 설명]' }
  ],
  // 학력
  education: [
    { degree: '학사', school: '서울시립대학교', major: '도시공학과(공학사)' },
    { degree: '석사', school: '서울시립대학교', major: '도시공학과(공학석사)' },
    { degree: '박사', school: '일본 요코하마국립대학교', major: '도시계획학(공학박사)' }
  ],
  // 분야별 경력
  journey: [
    {
      id: 'uos',
      label: '서울시립대',
      items: [
        { period: '2002.12 – 현재', title: '서울시립대학교 도시공학과 교수' },
        { period: '2007.03 – 2009.02', title: '서울시립대학교 도시과학연구원 기획부장' },
        { period: '2011.09 – 2013.06', title: '서울시립대학교 연구부처장 및 산학협력부단장' },
        { period: '2017.03 – 2019.02', title: '서울시립대학교 기획처장' }
      ]
    },
    {
      id: 'seoul',
      label: '서울시',
      items: [
        { period: '2007.07 – 2009.07', title: '강동구 도시계획위원' },
        { period: '2009.01 – 2011.01', title: '강남구 도시계획위원' },
        { period: '2012.01 – 2015.12', title: '서울시 학술용역심의회 위원' },
        { period: '2014.06 – 2018.05', title: '서울시 생활계획권 수립 동남권 총괄계획가' },
        { period: '2016.12 – 2018.12', title: '서울 수색역세권 개발 전문가 자문위원회 위원' },
        { period: '2020.11 – 현재', title: '서울특별시 도시계획위원회 위원' },
        { period: '2026.06 – 현재', title: 'G3 서울플랜 기획위원회 균형발전특별분과 위원장' }
      ]
    },
    {
      id: 'public',
      label: '공공기관',
      items: [
        { period: '2016.04 – 현재', title: '서울주택도시공사(SH) 투자심사위원회 위원' },
        { period: '2019.01 – 현재', title: '경기도시공사 기술자문위원회 위원' },
        { period: '2019.09 – 현재', title: '수원특례시 도시재생위원회 위원' },
        { period: '2024.06 – 2026.05', title: '서울주택도시공사(SH) 이사회 의장' }
      ]
    },
    {
      id: 'other',
      label: '기타',
      items: [
        { period: '2024.03 – 현재', title: 'KB부동산신탁 사외이사' },
        { period: '2024.03 – 2026.02', title: '(사)한국도시부동산학회 회장' }
      ]
    }
  ],
  journeyPhoto: {
    src: './president_assets/교수님니트_가장긴거.jpg',
    alt: '남진 교수 사진'
  },
  // 세부 공약은 확정되면 details 배열에 { title, description } 항목으로 추가합니다.
  pledges7: [
    { id: 'education', no: '01', field: '교육', title: '가르침이 존중받고 세계와 미래로 열리는 교육', details: [] },
    { id: 'research', no: '02', field: '연구', title: '꿈을 실현하는 연구, 세계와 경쟁하는 연구', details: [] },
    { id: 'student-growth', no: '03', field: '학생성장', title: '소통으로 설계하고 실천으로 완성하는 학생성장', details: [] },
    { id: 'future-campus', no: '04', field: '미래캠퍼스', title: '100년 캠퍼스, 다음 100년을 꿈꾸는 미래캠퍼스', featured: true, details: [] },
    { id: 'industry-collaboration', no: '05', field: '산학협력', title: '서울을 넘어, 함께 크는 산학협력', details: [] },
    { id: 'workplace', no: '06', field: '일터', title: '헌신이 예우로 돌아오는 일터', details: [] },
    { id: 'funding', no: '07', field: '재원', title: '약속으로 지키는 재원', details: [] }
  ],
  // 캠퍼스 환경개선 영상
  campusVideo: {
    src: '',
    poster: '',
    title: '캠퍼스 환경개선 영상',
    intro: '[영상 소개]'
  },
  // 공약 카드뉴스: 향후 { src: './files/card1.jpg', alt: '카드뉴스 1' } 형태로 추가
  cardNews: [],
  // president_assets 폴더에 PDF를 넣고 url에 './president_assets/파일명.pdf'를 지정하면 다운로드 버튼이 활성화됩니다.
  downloads: [
    { title: '남진 총장 후보자 공약집 (전체본)', format: 'PDF', size: '준비 중', url: '' },
    { title: '후보자 이력 및 비전 선언문 요약본', format: 'PDF', size: '준비 중', url: '' },
    { id: 'statement', title: '총장선거 입후보 소견서', format: 'PDF', size: '', url: './president_assets/261124_입후보소견서.pdf' }
  ],
  archive: [
    { no: 1, date: "2026.11.17", title: "서울 청년타운은 '미래 인재 키우는 인큐베이터'", keywords: "청년, 주택, 청년미래타운, 일자리", media: "세계일보", url: "https://www.segye.com/newsView/20261116514150", category: "기고" },
    { no: 2, date: "2026.11.03", title: "“세운4구역 재개발, 종묘와 상생 가능…유산별 관리기준 필요”", keywords: "세운4구역, 종묘, 세계유산, 보존과 개발", media: "이데일리", url: "https://marketin.edaily.co.kr/News/ReadE?newsId=04136086645642112", category: "기사" },
    { no: 3, date: "2026.11.03", title: "종묘·세운4구역 갈등에 전문가들 “제도 손질해야”…“세계유산영향평가 시행령 만든 나라는 한국뿐”", keywords: "세운4구역, 세계유산영향평가, 문화유산 규제", media: "매일경제", url: "https://www.mk.co.kr/news/all/12194910", category: "기사" },
    { no: 4, date: "2026.11.03", title: "다섯 번째 심의 앞둔 세운4구역, 유적 보존방식 놓고 서울시·유산청 평행선", keywords: "세운4구역, 유적 보존, 국가유산청, 도시계획", media: "아주경제", url: "https://www.ajunews.com/view/20261103151915374", category: "기사" },
    { no: 5, date: "2026.11.03", title: "매달 금융비용만 20억원…“세운4구역 표류에 주민 고통”", keywords: "세운4구역, 금융비용, 문화유산, 통경축", media: "데일리안", url: "https://www.dailian.co.kr/news/view/1710236/%EB%A7%A4%EB%8B%AC-%EA%B8%88%EC%9C%B5%EB%B9%84%EC%9A%A9-20%EC%96%B5%EC%9B%90%E2%80%9C%EC%84%B8%EC%9A%B44%EA%B5%AC%EC%97%AD-%ED%91%9C-2026", category: "기사" },
    { no: 6, date: "2026.09.27", title: "노량진4구역이 쏘아올린 '1+1 분양'…곳곳서 추가주택 가격 놓고 갈등", keywords: "1+1 분양, 재개발, 조합원, 사업성", media: "뉴스핌", url: "https://mobile2.newspim.com/news/view/20260923000746", category: "기사" },
    { no: 7, date: "2026.08.25", title: "“남산 곤돌라 공사 재개해야”…서울시 G3기획위 현장점검", keywords: "남산 곤돌라, G3 서울플랜, 관광, 접근성", media: "연합뉴스", url: "https://www.yna.co.kr/amp/view/AKR20260825104600004", category: "기사" },
    { no: 8, date: "2026.01.12", title: "노원구, S-DBC 주제로 ‘재건축·재개발 신속추진 포럼’ 개최", keywords: "S-DBC, 창동차량기지, 노원구, 재개발", media: "대한경제", url: "https://m.dnews.co.kr/m_home/view.jsp?idxno=202601121531187060322", category: "기사" },
    { no: 9, date: "2025.12.10", title: "세운 도심재개발은 '강북 전성시대'의 신호탄", keywords: "종묘, 세운지구, 문화유산, 재개발", media: "세계일보", url: "https://www.segye.com/newsView/20251210513782", category: "기고" },
    { no: 10, date: "2025.12.04", title: "세운지구 찾은 오세훈 “보존·개발 양립 가능”…첫삽까진 첩첩산중[부동산AtoZ](종합)", keywords: "세운지구, 문화유산, 개발과 보존, 건축디자인", media: "아시아경제", url: "https://view.asiae.co.kr/article/2025120413233714963", category: "기사" },
    { no: 11, date: "2025.11.28", title: "“서울 주택공급 해법, 정비사업 활성화가 핵심”", keywords: "서울 주택공급, 재개발, 재건축, 신속통합기획", media: "머니투데이", url: "https://www.mt.co.kr/estate/2025/11/28/2025112720033263585", category: "기사" },
    { no: 12, date: "2025.11.23", title: "“문화재 근처 산 게 죄?”…종묘 앞 세운4구역, 보상 없는 규제가 남긴 빚은 7250억원 [부동산360]", keywords: "세운4구역, 종묘, 재산권, 보상, 사업 지연", media: "헤럴드경제", url: "https://biz.heraldcorp.com/article/10621293", category: "기사" },
    { no: 13, date: "2025.07.21", title: "서울의 새로운 엣지 도심, 창동·상계의 가능성", keywords: "서울아레나, 창동차량기지, 동북권, 광역중심지", media: "머니투데이", url: "https://www.mt.co.kr/amp/estate/2025/07/21/2025072011040045033", category: "기고" },
    { no: 14, date: "2025.06.18", title: "고도관리방안‥도심 공간 확보 위한 기준 있어야", keywords: "제주, 고도관리, 압축도시, 도심 공간", media: "제주MBC", url: "https://jejumbc.com/NewsArticle/189070", category: "기사" },
    { no: 15, date: "2025.05.21", title: "“새 집도 좋다지만”…주민 반대·공사비에 사업 접는 정비조합 '수두룩'", keywords: "정비사업, 주민 갈등, 공사비, 공공 지원", media: "뉴스핌", url: "https://news.nate.com/view/20250521n02893", category: "기사" },
    { no: 16, date: "2025.02.26", title: "“양도·양수지역 선정 기준 촘촘해야 용적률 사고파는 혼란 막을 수 있어”", keywords: "용적이양제, 양도지역, 양수지역, 운영 기준", media: "서울신문", url: "https://go.seoul.co.kr/news/newsView.php?id=20250226021014", category: "기사" },
    { no: 17, date: "2025.02.25", title: "“서울 '용적이양제' 풍납토성·북촌 가능…개별공시지가 활용”", keywords: "용적이양제, 풍납토성, 북촌, 개별공시지가", media: "연합뉴스", url: "https://www.yna.co.kr/view/AKR20250225149800004", category: "기사" },
    { no: 18, date: "2025.02.25", title: "서울 용적이양제 1호 적용은 종로ㆍ중구 재개발 사업", keywords: "용적이양제, 종로구, 중구, 재개발", media: "대한경제", url: "https://www.dnews.co.kr/uhtml/view.jsp?idxno=202502251526223590957", category: "기사" },
    { no: 19, date: "2025.02.25", title: "“서울형 용적이양제, 풍납토성·북촌에 적용 가능…공시지가 활용”", keywords: "용적이양제, 풍납토성, 북촌, 공시지가", media: "이데일리", url: "https://www.edaily.co.kr/News/Read?mediaCodeNo=257&newsId=04483766642074128", category: "기사" },
    { no: 20, date: "2025.02.25", title: "서울 북촌·풍납토성 용적률 팔 수 있다…“땅 교환 기준 마련해야”", keywords: "용적이양제, 북촌, 풍납토성, 용적 교환 기준", media: "뉴스1", url: "https://www.news1.kr/amp/realestate/general/5701011", category: "기사" },
    { no: 21, date: "2025.02.25", title: "'용적이양제' 서울 첫 도입…투자 판도 바뀐다", keywords: "용적이양제, 도시 밀도, 규제, 부동산 투자", media: "뉴스토마토", url: "https://www.newstomato.com/ReadNews.aspx?no=1254510", category: "기사" },
    { no: 22, date: "2025.01.10", title: "서울 준공업지역, 융복합 공간으로", keywords: "준공업지역, 용도지역, 융복합 공간", media: "서울신문", url: "https://www.seoul.co.kr/news/editOpinion/opinion/contribution/2025/01/10/20250110033004", category: "기고" },
    { no: 23, date: "2024.12.26", title: "세운, 글로벌 도시 서울의 새로운 기회", keywords: "세운지구, 종묘, 문화유산, 도심", media: "머니투데이", url: "https://www.mt.co.kr/opinion/2024/12/26/2024122414280366253", category: "기고" },
    { no: 24, date: "2024.12.09", title: "서울역, 새로운 미래를 위한 대전환의 시작", keywords: "서울역, 중심지, 대전환, 개발", media: "머니투데이", url: "https://www.mt.co.kr/opinion/2024/12/09/2024120811275032026", category: "기고" },
    { no: 25, date: "2024.11.25", title: "[단독]63빌딩보다 높은 290m 아파트…압구정 '新한강장벽' 논란", keywords: "압구정 재건축, 초고층, 한강 경관, 스카이라인", media: "중앙일보", url: "https://www.joongang.co.kr/article/25294518", category: "기사" },
    { no: 26, date: "2024.11.14", title: "“저출산 해결위해 자녀 1명당 청약가점 5→10점 올려야”", keywords: "저출생, 주택청약, 청약가점, 부양가족", media: "동아일보", url: "https://www.donga.com/news/Economy/article/all/20241113/130421511/2", category: "기사" },
    { no: 27, date: "2024.07.11", title: "주민-행정-전문가 협력 신통기획, 정비사업 새 길 열길", keywords: "신속통합기획, 정비사업, 도시계획, 주택정책", media: "동아일보", url: "https://www.donga.com/news/Opinion/article/all/20240711/125894044/2", category: "기고" },
    { no: 28, date: "2024.05.27", title: "재개발‧재건축 권위자들 “도시정비 패러다임 바꿔야”", keywords: "도시정비, 재개발, 재건축, 복합개발, 엣지시티", media: "뉴스웨이", url: "https://www.newsway.co.kr/news/view?ud=2024052718383110245", category: "기사" },
    { no: 29, date: "2024.04.09", title: "\"日 아키하바라처럼…크고 작은 기업·상가 연계하나 융합 도시로\" [용산의 미래]", keywords: "용산국제업무지구, 연결과 융합, 복합용도개발, 다양성", media: "아시아경제", url: "https://view.asiae.co.kr/article/2024040517585903726", category: "인터뷰" },
    { no: 30, date: "2024.03.03", title: "서울시립대 남진 교수, 한국도시부동산학회장 취임", keywords: "한국도시부동산학회, 학회장 취임, 학제 간 협력", media: "뉴시스", url: "https://www.newsis.com/view/NISX20240303_0002646031", category: "기사" },
    { no: 31, date: "2023.09.21", title: "남진 서울시립대 교수, 정비사업 이론 담은 '도시정비론' 발간", keywords: "도시정비론, 정비사업, 저서 발간", media: "뉴시스", url: "https://www.newsis.com/view/NISX20230921_0002459495", category: "기사" },
    { no: 32, date: "2023.05.11", title: "도시개발 3대 악순환…신도시 ‘교통지옥’ 갇혔다 [이슈 포커스]", keywords: "신도시, 광역교통, 주택공급, 서울 접근성", media: "서울신문", url: "https://www.seoul.co.kr/news/newsView.php?id=20230511001008", category: "기사" },
    { no: 33, date: "2023.01.13", title: "서울시립대 차기 총장후보자에 원용걸·남진 교수", keywords: "서울시립대학교, 총장후보자, 총장 선거", media: "뉴스1", url: "https://www.news1.kr/society/education/4924198", category: "기사" },
    { no: 34, date: "2022.11.01", title: "메테우스운용, 사외이사에 남진 시립대 교수 선임", keywords: "메테우스자산운용, 사외이사, 도시개발, 도시재생", media: "대한경제", url: "https://www.dnews.co.kr/uhtml/view.jsp?idxno=202211011206570270861", category: "기사" },
    { no: 35, date: "2022.04.07", title: "고만고만한 건물 다닥다닥..88년전 법령에 막힌 홍대거리", keywords: "용도지역제, 도시밀도, 용적률, 복합용도", media: "머니투데이", url: "https://v.daum.net/v/EcTPxlYLCw", category: "기사" },
    { no: 36, date: "2020.07.17", title: "그린벨트 해제가 답? 'MB표 보금자리' 후유증 재연 우려", keywords: "그린벨트, 개발제한구역, 주택공급, 도시기본계획", media: "한국일보", url: "https://v.daum.net/v/20200717010002328", category: "기사" },
    { no: 37, date: "2019.11.07", title: "도시재생회사' 육성하자", keywords: "도시재생회사, 민간참여, 민관협력, 도시재생 뉴딜", media: "세계일보", url: "https://www.segye.com/newsView/20191107513834", category: "기고" },
    { no: 38, date: "2019.06.05", title: "모든 시민이 안전하고 편리하게 서비스를 영위하는 SmartCity", keywords: "스마트시티, ICT, 융복합 학과", media: "서울시립대학교", url: "https://www.uos.ac.kr/html/prom/newsletter_vol_80/index.html", category: "인터뷰" },
    { no: 39, date: "2019.01.14", title: "“'원조' 메이커시티, 정말 주상복합에 내줘야 하나요”", keywords: "세운3구역, 입정동, 도심 제조업, 역사도심", media: "뉴스1", url: "https://www.news1.kr/society/general-society/3523448", category: "기사" },
    { no: 40, date: "2018.03.08", title: "'동 단위' 도시계획…서울시 생활권계획 본격 가동", keywords: "서울생활권계획, 동 단위 계획, 주민참여, 균형발전", media: "TBS", url: "https://tbs.seoul.kr/news/newsView.do?idx_800=2291498&seq_800=10269027&typ_800=R", category: "기사" },
    { no: 41, date: "2018.01.15", title: "'집값 상승 진원지' 강남 재건축 잡으려 연한 늘리나", keywords: "재건축 연한, 강남 집값, 광역계획, 공급 조절", media: "뉴데일리", url: "https://biz.newdaily.co.kr/site/data/html/2018/01/15/2018011510041.html", category: "기사" },
    { no: 42, date: "2017.11.30", title: "재건축 공적자금 투입했는데.. 서울시 창조적정비사업 '삐걱'", keywords: "재건축조합, 공공지원, 정비사업 갈등, 공공감리", media: "이데일리", url: "https://v.daum.net/v/20171130050035966", category: "기사" },
    { no: 43, date: "2017.06.20", title: "[서울형 도시재생 공공 디벨로퍼가 이끈다] 마을 주민이 재개발 싱크탱크… 사업성보다 삶의 질 높인다", keywords: "서울형 도시재생, 희망지 사업, 주민 역량, 창3동", media: "서울신문", url: "https://m.go.seoul.co.kr/news/publicnews/local_govern/2017/06/21/20170621017006", category: "기사" },
    { no: 44, date: "2017.05.12", title: "서울 성수동 도시재생사업 본격 추진", keywords: "성수동, 도시재생활성화, 총괄계획가, 주민협의체", media: "뉴시스", url: "https://www.newsis.com/view/NISX20170512_0014889750", category: "기사" },
    { no: 45, date: "2017.04.13", title: "박원순표 도시재생, 주민참여 먼저 본다", keywords: "도시재생, 주민참여, 희망지 사업, 성수동", media: "서울&", url: "https://www.seouland.com/arti/society/society_general/1835.html", category: "기사" },
    { no: 46, date: "2016.12.10", title: "\"'도시재생'은 마라톤이다\"", keywords: "도시재생, 성수동, 가리봉동, 젠트리피케이션", media: "프레시안", url: "https://www.pressian.com/pages/articles/145828", category: "인터뷰" },
    { no: 47, date: "2016.09.23", title: "도시재생으로 보는 도시의 미래", keywords: "도시재생, 성수동, 가리봉동, 젠트리피케이션", media: "건축신문", url: "https://architecture-newspaper.com/vol19-chpt09/", category: "인터뷰" },
    { no: 48, date: "2016.05.27", title: "기업형임대주택 공급촉진지구, 국토교통부의 혜안을 기대하며", keywords: "기업형임대주택, 국토교통부, 주택공급", media: "아시아경제", url: "https://view.asiae.co.kr/news/view.htm?idxno=2016052710580831777", category: "기고" },
    { no: 49, date: "2015.11.30", title: "산으로 가는 세운상가 재개발", keywords: "세운상가, 도심재생, 보존, 민간개발", media: "매일경제", url: "https://www.mk.co.kr/news/realestate/7089985", category: "기사" },
    { no: 50, date: "2015.07.14", title: "“중재기구·기준 없인 무용지물”", keywords: "용적률 거래, 결합건축, 중재기구, 거래 기준", media: "헤럴드경제", url: "https://biz.heraldcorp.com/article/585026", category: "기사" },
    { no: 51, date: "2012.09.17", title: "서울 임대 8만호 공급 순조…효과는 ‘글쎄’", keywords: "공공임대주택, 공급계획, 주택시장, 예측 가능성", media: "연합뉴스", url: "https://www.seoul.co.kr/news/society/2012/09/17/20120917800009", category: "기사" },
    { no: 52, date: "2009.03.17", title: "“이주 대책 못 믿겠다”…도심상가 재개발 발목", keywords: "도심상가, 재개발, 상인 이주대책, 주민 갈등", media: "SBS", url: "https://news.sbs.co.kr/news/endPage.do?news_id=N1000561526", category: "기사" },
    { no: 53, date: "2009.03.12", title: "[학과 프리즘 / 도시공학과] 안전하고 지속 가능한 삶 위한 모든 것 배운다", keywords: "도시공학과, 전공 교육, 진로, 서울시립대", media: "조선에듀", url: "https://edu.chosun.com/m/edu_article.html?contid=2010022800216", category: "기사" },
    { no: 54, date: "2008.05.09", title: "“준공업지역 아파트건축 안돼”", keywords: "준공업지역, 공장 이전, 아파트 건축, 도시경쟁력", media: "서울신문", url: "https://m.seoul.co.kr/news/region/2008/05/09/20080509014013", category: "기사" },
    { no: 55, date: "2006.11.27", title: "[은평구 뒤덮은 ‘재개발 폭탄’] 2006판 ‘난장이가 쏘아올린 작은 공’", keywords: "은평구, 뉴타운, 원주민 재정착, 저소득층", media: "이코노미스트", url: "https://economist.co.kr/article/view/ecn200611270034", category: "기사" },
    { no: 56, date: "2006.11.27", title: "[은평구 뒤덮은 ‘재개발 폭탄’] 서민들 보금자리만 허물어졌다", keywords: "은평구, 재개발, 지역공동체, 원주민 재정착", media: "이코노미스트", url: "https://economist.co.kr/article/view/ecn200611270033", category: "기사" },
    { no: 57, date: "2004.10.05", title: "날자! 도봉의 꿈 활짝 핀다", keywords: "도봉구, 지역개발, 관광단지, 배후 주거지", media: "서울신문", url: "https://www.seoul.co.kr/news/Seoul_In/seoul_metro/2004/10/05/20041005051002", category: "기사" },
    { no: 58, date: "2003.12.31", title: "[강북 르네상스시대] (1) '10년 종합개발 본격화'", keywords: "강북 르네상스, 뉴타운, 균형발전, 도시 성장관리", media: "한국경제", url: "https://www.hankyung.com/article/2003123134451", category: "기사" }
  ]

};