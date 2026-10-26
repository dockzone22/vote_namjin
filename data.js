/* 반복 콘텐츠 수정: 배열에 항목을 추가하거나 삭제하면 화면에 반영됩니다.
   실제 자료가 확정되기 전까지 자리표시자를 유지하세요. */
window.SITE_DATA = {
  menu: [
    { id: 'interview', label: '인터뷰 영상' },
    { id: 'priorities', label: '핵심 과제' },
    { id: 'pledges', label: '공약', children: [
      { id: 'faculty', label: '교수' }, { id: 'staff', label: '직원' }, { id: 'students', label: '학생' }
    ] },
    { id: 'roadmap', label: '4년 로드맵' },
    { id: 'achievements', label: '주요 업적' },
    { id: 'downloads', label: '파일 받기' }
  ],
  // embedUrl에 신뢰할 수 있는 HTTPS 영상 임베드 주소를 입력하세요. 자동재생은 사용하지 않습니다.
  interview: { embedUrl: '', title: '[인터뷰 제목]' },
  priorities: Array.from({ length: 3 }, () => ({ title: '[핵심 과제 제목]', description: '[설명]' })),
  pledges: [
    { id: 'faculty', label: '교수', items: Array.from({ length: 3 }, () => ({ title: '[공약 제목]', description: '[공약 설명]' })) },
    { id: 'staff', label: '직원', items: Array.from({ length: 3 }, () => ({ title: '[공약 제목]', description: '[공약 설명]' })) },
    { id: 'students', label: '학생', items: Array.from({ length: 3 }, () => ({ title: '[공약 제목]', description: '[공약 설명]' })) }
  ],
  roadmap: Array.from({ length: 4 }, (_, i) => ({ year: `${i + 1}차 연도`, title: '[연차별 목표]', description: '[주요 추진 내용]' })),
  achievements: Array.from({ length: 4 }, () => ({ title: '[업적 제목]', period: '[관련 기간]', description: '[설명]' })),
  // president_assets 폴더에 PDF를 넣고 url에 './president_assets/파일명.pdf'를 지정하면 다운로드 버튼이 활성화됩니다.
  downloads: [
    { title: '남진 총장 후보자 공약집 (전체본)', format: 'PDF', size: '준비 중', url: '' },
    { title: '후보자 이력 및 비전 선언문 요약본', format: 'PDF', size: '준비 중', url: '' },
    { title: '시대(市大) 발전 4개년 세부 로드맵', format: 'PDF', size: '준비 중', url: '' }
  ]
};
