const questions = [
  {
    category: "위험 감수",
    axis: "risk",
    prompt: "ETF가 한 달 만에 12% 하락했다면?",
    answers: [
      { text: "투자 논리가 그대로라면 추가 매수도 검토한다.", value: "R" },
      { text: "손실이 더 커지기 전에 비중을 줄이고 싶다.", value: "S" }
    ]
  },
  {
    category: "위험 감수",
    axis: "risk",
    prompt: "투자에서 더 아쉬운 상황은 무엇인가요?",
    answers: [
      { text: "위험을 피하다가 큰 상승 기회를 놓치는 것.", value: "R" },
      { text: "높은 수익을 노리다가 큰 손실을 보는 것.", value: "S" }
    ]
  },
  {
    category: "위험 감수",
    axis: "risk",
    prompt: "내 포트폴리오가 크게 흔들릴 때 나는?",
    answers: [
      { text: "높은 기대수익을 위해 어느 정도 감수할 수 있다.", value: "R" },
      { text: "기대수익을 낮추더라도 변동성을 줄이고 싶다.", value: "S" }
    ]
  },
  {
    category: "투자 속도",
    axis: "pace",
    prompt: "ETF를 산 뒤 가격을 확인하는 빈도는?",
    answers: [
      { text: "거의 매일 또는 매주 확인하는 편이다.", value: "Q" },
      { text: "한 달이나 분기 단위로 천천히 확인한다.", value: "P" }
    ]
  },
  {
    category: "투자 속도",
    axis: "pace",
    prompt: "시장 주도 업종이 바뀌었다고 느껴지면?",
    answers: [
      { text: "기존 ETF를 줄이고 새 업종으로 빠르게 이동한다.", value: "Q" },
      { text: "처음 세운 자산 배분을 크게 바꾸지 않는다.", value: "P" }
    ]
  },
  {
    category: "투자 속도",
    axis: "pace",
    prompt: "내가 생각하는 적절한 보유 기간은?",
    answers: [
      { text: "몇 주에서 1년 이내의 기회를 주로 본다.", value: "Q" },
      { text: "최소 3년 이상 장기 보유를 선호한다.", value: "P" }
    ]
  },
  {
    category: "수익 목표",
    axis: "goal",
    prompt: "투자 수익에서 더 중요한 것은?",
    answers: [
      { text: "ETF 가격이 장기적으로 크게 상승하는 것.", value: "G" },
      { text: "분배금이나 이자가 꾸준히 들어오는 것.", value: "I" }
    ]
  },
  {
    category: "수익 목표",
    axis: "goal",
    prompt: "다음 중 더 끌리는 ETF는 무엇인가요?",
    answers: [
      { text: "실적이 빠르게 성장하는 기업 중심 ETF.", value: "G" },
      { text: "배당이나 이자수익을 제공하는 ETF.", value: "I" }
    ]
  },
  {
    category: "수익 목표",
    axis: "goal",
    prompt: "당장 분배금이 많지 않더라도?",
    answers: [
      { text: "장기 성장 가능성이 크다면 괜찮다.", value: "G" },
      { text: "정기적인 현금흐름이 있는 상품이 더 좋다.", value: "I" }
    ]
  },
  {
    category: "상품 선택",
    axis: "product",
    prompt: "더 편안하게 느껴지는 상품은?",
    answers: [
      { text: "수백 개 기업에 넓게 투자하는 지수 ETF.", value: "M" },
      { text: "AI·방산·바이오 등 특정 산업 ETF.", value: "T" }
    ]
  },
  {
    category: "상품 선택",
    axis: "product",
    prompt: "ETF 상위 10개 종목 비중이 70%라면?",
    answers: [
      { text: "지나치게 집중돼 있어 부담스럽다.", value: "M" },
      { text: "확신 있는 산업이라면 집중도 괜찮다.", value: "T" }
    ]
  },
  {
    category: "상품 선택",
    axis: "product",
    prompt: "새로운 산업이 성장할 것으로 예상될 때?",
    answers: [
      { text: "시장 전체 ETF 안에서 간접적으로 투자한다.", value: "M" },
      { text: "해당 산업에 집중하는 테마 ETF를 선택한다.", value: "T" }
    ]
  }
];

const resultProfiles = {
  RQGM: {
    emoji: "⚡",
    title: "로켓 지수 탐험가",
    slogan: "넓게 담되, 기회에는 빠르게 반응하는 투자자",
    summary: "시장 전체의 성장 가능성을 믿으면서도 흐름이 바뀌면 재빨리 대응하는 편입니다. 분산투자를 선호하지만 수익 기회를 놓치는 것은 싫어합니다.",
    fit: "성장주 비중이 높은 대표지수, 스타일·팩터 ETF, 순환매에 대응하기 쉬운 광범위 지수형 상품",
    caution: "잦은 교체로 거래 비용이 늘거나, 분산 ETF를 샀다는 이유로 실제 변동성을 과소평가할 수 있습니다.",
    usage: "코어 지수 ETF를 중심에 두고 시장 국면에 따라 일부 비중만 기민하게 조절하는 방식이 어울립니다."
  },
  RQGT: {
    emoji: "🎯",
    title: "테마 레이더 헌터",
    slogan: "빠른 정보와 강한 확신으로 테마를 포착하는 투자자",
    summary: "새로운 정책, 산업 변화, 실적 모멘텀에 민감합니다. 시장의 관심이 어디로 이동하는지 빠르게 읽고 집중 투자에서 기회를 찾습니다.",
    fit: "AI·반도체·로봇·방산·바이오 등 실적이나 정책 촉매가 분명한 테마형 ETF",
    caution: "고점 추격, 소수 종목 편중, 유행 종료 후 급락에 특히 취약합니다. 이름보다 실제 구성 종목을 먼저 봐야 합니다.",
    usage: "전체 포트폴리오의 일부만 전술적 위성 자산으로 배정하고, 진입 전 손실 허용 범위를 정하는 방식이 적합합니다."
  },
  RQIM: {
    emoji: "🛹",
    title: "민첩한 인컴 밸런서",
    slogan: "현금흐름도 챙기고 시장 변화에도 빠르게 대응하는 투자자",
    summary: "분배금과 이자수익을 중요하게 생각하지만 한 상품을 오래 들고 있기보다는 금리와 시장 상황에 맞춰 적극적으로 조정합니다.",
    fit: "단기채·배당주·리츠·인컴형 ETF를 시장 환경에 따라 조합하는 전략",
    caution: "분배율만 보고 상품을 이동하면 가격 하락이나 세후 총수익률을 놓칠 수 있습니다.",
    usage: "현금흐름 자산을 여러 종류로 나누고 금리 방향에 따라 듀레이션과 주식 비중을 조절하는 데 어울립니다."
  },
  RQIT: {
    emoji: "🔥",
    title: "핫이슈 배당 사냥꾼",
    slogan: "뜨는 테마에서 현금흐름까지 찾는 투자자",
    summary: "시장 관심이 집중되는 산업을 빠르게 포착하면서도 분배금이 있는 상품을 선호합니다. 테마와 인컴을 동시에 추구하는 성향입니다.",
    fit: "섹터 고배당, 인프라·리츠, 테마형 커버드콜 등 특정 산업과 인컴 전략을 결합한 ETF",
    caution: "높은 분배금이 원금 하락을 가릴 수 있고, 커버드콜은 강한 상승장에서 수익이 제한될 수 있습니다.",
    usage: "단기 전술 비중으로만 사용하고, 분배 재원과 옵션 전략 구조를 반드시 확인하는 것이 좋습니다."
  },
  RPGM: {
    emoji: "🚢",
    title: "장기 성장 항해사",
    slogan: "긴 호흡으로 시장 성장과 복리를 믿는 투자자",
    summary: "변동성을 감수할 수 있지만 매일 시장을 쫓기보다는 장기적인 기업이익 성장과 복리 효과를 더 중요하게 생각합니다.",
    fit: "미국·국내 대표지수, 글로벌 주식, 성장·퀄리티 팩터 ETF",
    caution: "장기투자라는 이유로 과도한 주식 비중이나 고평가 구간을 무조건 견디려 할 수 있습니다.",
    usage: "포트폴리오의 핵심 자산으로 두고 정기 적립과 주기적인 리밸런싱을 활용하는 방식이 잘 맞습니다."
  },
  RPGT: {
    emoji: "🚀",
    title: "미래 테마 개척자",
    slogan: "긴 호흡으로 미래 산업을 선점하는 투자자",
    summary: "단기 등락보다는 산업의 장기 성장성을 믿고 집중할 수 있는 유형입니다. 높은 변동성을 감수하면서 미래의 구조적 변화를 기다립니다.",
    fit: "AI·로봇·우주·에너지 전환·바이오 등 장기 성장 논리가 있는 산업 ETF",
    caution: "좋은 산업과 좋은 투자 가격은 다릅니다. 상용화 지연, 적자 기업 비중, 테마 내 종목 중복을 점검해야 합니다.",
    usage: "코어 자산과 분리된 장기 위성 자산으로 운용하고, 여러 테마에 무분별하게 분산하지 않는 것이 좋습니다."
  },
  RPIM: {
    emoji: "🌳",
    title: "복리 인컴 설계자",
    slogan: "꾸준한 현금흐름을 오래 쌓아가는 투자자",
    summary: "시장 변동성을 감수할 수 있으면서도 가격 상승보다 배당과 이자의 재투자를 통한 장기 복리에 더 매력을 느낍니다.",
    fit: "배당성장주, 리츠, 우량채권, 멀티에셋 인컴 ETF",
    caution: "높은 배당률보다 배당의 지속 가능성과 총수익률이 중요합니다. 금리 변화에도 민감할 수 있습니다.",
    usage: "주식·채권·리츠를 섞어 현금흐름원을 분산하고 분배금을 재투자하는 방식이 적합합니다."
  },
  RPIT: {
    emoji: "🧺",
    title: "테마 인컴 수집가",
    slogan: "좋아하는 산업을 오래 보유하며 수익을 모으는 투자자",
    summary: "특정 산업에 대한 장기 확신이 있고, 그 과정에서 분배금까지 얻는 것을 선호합니다. 테마를 고른 뒤에는 비교적 오래 기다리는 편입니다.",
    fit: "인프라·에너지·리츠·고배당 섹터 및 장기 보유형 커버드콜 ETF",
    caution: "산업 집중 위험과 분배금 착시를 동시에 점검해야 합니다. 강한 상승장에서 기회비용이 커질 수 있습니다.",
    usage: "코어 자산을 대체하기보다 장기 위성 인컴 자산으로 제한해 사용하는 편이 안전합니다."
  },
  SQGM: {
    emoji: "🧭",
    title: "신중한 성장 인덱서",
    slogan: "성장은 놓치지 않되 위험은 꼼꼼히 확인하는 투자자",
    summary: "가격 상승 가능성을 원하지만 큰 손실은 부담스럽습니다. 넓은 분산과 객관적인 지수를 통해 비교적 안정적으로 성장에 참여하려 합니다.",
    fit: "대표지수, 퀄리티, 저변동성, 배당성장과 같은 분산형 성장 ETF",
    caution: "안정적인 이름만 믿고 환율·지역·종목 집중 위험을 간과할 수 있습니다.",
    usage: "분산 지수 ETF를 기본으로 두고 주식 비중을 자신의 손실 감내 수준에 맞추는 방식이 좋습니다."
  },
  SQGT: {
    emoji: "🔍",
    title: "선별형 테마 관찰자",
    slogan: "뜨는 산업을 보되 쉽게 뛰어들지는 않는 투자자",
    summary: "새로운 산업과 정책 수혜주에 관심이 많지만 높은 변동성은 경계합니다. 충분히 확인한 뒤 제한된 비중으로 접근하는 편입니다.",
    fit: "실적 가시성이 높고 대형주 비중이 충분한 섹터·테마 ETF",
    caution: "관찰하다 진입 시점을 놓치거나, 안전해 보이는 테마 ETF도 실제로는 집중도가 높을 수 있습니다.",
    usage: "소액 분할 매수와 명확한 편입 기준을 활용해 위성 자산으로 접근하는 것이 어울립니다."
  },
  SQIM: {
    emoji: "☂️",
    title: "안정형 현금흐름 관리자",
    slogan: "변동성을 낮추고 꾸준한 수익을 관리하는 투자자",
    summary: "큰 가격 변동보다 안정적인 분배금과 이자수익을 선호하며, 시장 환경이 달라지면 비교적 빠르게 방어적인 선택을 합니다.",
    fit: "단기채, 우량채권, 배당주, 저변동성, 현금성 ETF",
    caution: "지나친 안정 추구로 물가 상승이나 장기 성장 기회를 놓칠 수 있습니다.",
    usage: "생활자금과 장기자금을 구분하고, 안전자산 안에서도 만기와 신용 위험을 나누는 방식이 좋습니다."
  },
  SQIT: {
    emoji: "🛡️",
    title: "방어형 테마 인컴러",
    slogan: "관심 산업 안에서도 방어력과 현금흐름을 찾는 투자자",
    summary: "특정 산업에는 관심이 있지만 큰 변동은 피하고 싶어 합니다. 배당, 인프라, 커버드콜처럼 방어 요소가 있는 테마를 선호합니다.",
    fit: "고배당 섹터, 인프라, 필수소비재, 통신, 제한적인 테마형 커버드콜 ETF",
    caution: "방어형이라는 이름과 실제 손실 위험은 다를 수 있습니다. 산업 집중도와 분배 정책을 함께 확인해야 합니다.",
    usage: "전체 자산의 일부만 배정하고, 대표지수나 채권 ETF와 함께 위험을 분산하는 편이 적합합니다."
  },
  SPGM: {
    emoji: "📚",
    title: "정석 장기 지수 투자자",
    slogan: "시장 전체와 복리의 힘을 차분히 믿는 투자자",
    summary: "큰 위험을 선호하지 않으며 시장을 자주 예측하기보다 넓게 분산된 ETF를 오래 보유하는 방식을 편안하게 느낍니다.",
    fit: "전 세계 주식, 국내외 대표지수, 퀄리티·저변동성 ETF",
    caution: "하락장에서 두려움 때문에 장기 전략을 중단하거나, 지나치게 보수적인 비중으로 성장성을 낮출 수 있습니다.",
    usage: "정기 적립식 매수와 연 1~2회 리밸런싱을 중심으로 포트폴리오의 코어를 구성하기 좋습니다."
  },
  SPGT: {
    emoji: "🌱",
    title: "느긋한 미래 산업 투자자",
    slogan: "유행보다 산업의 긴 성장 곡선을 바라보는 투자자",
    summary: "새로운 산업에 관심이 있지만 단기 가격을 쫓지는 않습니다. 위험을 크게 늘리지 않는 범위에서 장기적인 테마 투자를 선호합니다.",
    fit: "대형주 중심의 장기 성장 테마, 혁신산업을 넓게 묶은 ETF",
    caution: "장기 성장 스토리에만 기대어 실적 부진이나 구조 변화에 늦게 대응할 수 있습니다.",
    usage: "대표지수 ETF를 중심에 두고, 확신이 높은 테마 하나나 둘만 소규모로 오래 보유하는 방식이 좋습니다."
  },
  SPIM: {
    emoji: "🏡",
    title: "든든한 자산배분 수호자",
    slogan: "수익보다 지속 가능한 포트폴리오를 먼저 생각하는 투자자",
    summary: "큰 변동을 피하고 장기간 안정적인 현금흐름을 유지하는 것을 중요하게 생각합니다. 분산과 균형을 최우선으로 둡니다.",
    fit: "우량채권, 배당성장, 리츠, 멀티에셋, 자산배분형 ETF",
    caution: "안전해 보이는 자산끼리도 금리나 경기 상황에 따라 함께 하락할 수 있습니다.",
    usage: "주식·채권·리츠·현금성 자산을 역할별로 나누고 정기적으로 원래 비중으로 되돌리는 전략이 잘 맞습니다."
  },
  SPIT: {
    emoji: "🍵",
    title: "차분한 테마 배당 투자자",
    slogan: "좋아하는 산업을 천천히, 현금흐름과 함께 담는 투자자",
    summary: "시장 전체보다는 특정 산업에 관심이 있지만 무리한 수익보다 안정적인 보유 경험을 선호합니다. 장기적인 분배금 흐름을 중요하게 봅니다.",
    fit: "인프라, 리츠, 통신, 유틸리티, 고배당 섹터 ETF",
    caution: "특정 산업에 오래 머물며 구조적 침체나 금리 민감도를 놓칠 수 있습니다.",
    usage: "다른 자산과 함께 제한된 비중으로 보유하며, 분배금뿐 아니라 가격과 총수익률을 같이 확인하는 것이 좋습니다."
  }
};

const axisMeta = [
  { key: "risk", first: "R", second: "S", firstLabel: "적극형", secondLabel: "안정형", title: "위험 감수" },
  { key: "pace", first: "Q", second: "P", firstLabel: "기민형", secondLabel: "인내형", title: "투자 속도" },
  { key: "goal", first: "G", second: "I", firstLabel: "성장형", secondLabel: "인컴형", title: "수익 목표" },
  { key: "product", first: "M", second: "T", firstLabel: "시장분산", secondLabel: "테마집중", title: "상품 선택" }
];

const screens = {
  start: document.getElementById("startScreen"),
  quiz: document.getElementById("quizScreen"),
  result: document.getElementById("resultScreen")
};

const startButton = document.getElementById("startButton");
const brandButton = document.getElementById("brandButton");
const backButton = document.getElementById("backButton");
const restartButton = document.getElementById("restartButton");
const copyButton = document.getElementById("copyButton");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const questionCategory = document.getElementById("questionCategory");
const questionNumber = document.getElementById("questionNumber");
const questionTitle = document.getElementById("questionTitle");
const answerList = document.getElementById("answerList");
const toast = document.getElementById("toast");

let currentQuestion = 0;
let answers = [];
let latestCode = "";

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetTest() {
  currentQuestion = 0;
  answers = [];
  latestCode = "";
  showScreen("start");
}

function startTest() {
  currentQuestion = 0;
  answers = [];
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
  questionCategory.textContent = question.category;
  questionNumber.textContent = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;
  questionTitle.textContent = question.prompt;
  backButton.disabled = currentQuestion === 0;

  answerList.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer.text;
    button.dataset.value = answer.value;

    if (answers[currentQuestion] === answer.value) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => selectAnswer(answer.value, button));
    answerList.appendChild(button);

    if (index === 0) {
      setTimeout(() => button.focus({ preventScroll: true }), 60);
    }
  });
}

function selectAnswer(value, button) {
  answers[currentQuestion] = value;
  [...answerList.children].forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");

  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }, 240);
}

function goBack() {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  renderQuestion();
}

function countValues(first, second) {
  const firstCount = answers.filter((answer) => answer === first).length;
  const secondCount = answers.filter((answer) => answer === second).length;
  return { firstCount, secondCount, total: firstCount + secondCount };
}

function buildResultCode() {
  return axisMeta.map((axis) => {
    const { firstCount, secondCount } = countValues(axis.first, axis.second);
    return firstCount >= secondCount ? axis.first : axis.second;
  }).join("");
}

function renderAxes(code) {
  const axisGrid = document.getElementById("axisGrid");
  axisGrid.replaceChildren();

  axisMeta.forEach((axis, index) => {
    const { firstCount, total } = countValues(axis.first, axis.second);
    const firstPercent = total ? Math.round((firstCount / total) * 100) : 50;
    const selectedLetter = code[index];
    const selectedLabel = selectedLetter === axis.first ? axis.firstLabel : axis.secondLabel;

    const card = document.createElement("div");
    card.className = "axis-card";
    card.innerHTML = `
      <div class="axis-head">
        <strong>${axis.title}</strong>
        <span>${selectedLetter} · ${selectedLabel}</span>
      </div>
      <div class="axis-track" aria-hidden="true">
        <div class="axis-fill" style="width: ${firstPercent}%"></div>
      </div>
      <div class="axis-labels">
        <span>${axis.firstLabel}</span>
        <span>${axis.secondLabel}</span>
      </div>
    `;
    axisGrid.appendChild(card);
  });
}

function showResult() {
  latestCode = buildResultCode();
  const profile = resultProfiles[latestCode];

  document.getElementById("resultEmoji").textContent = profile.emoji;
  document.getElementById("resultCode").textContent = latestCode;
  document.getElementById("resultTitle").textContent = profile.title;
  document.getElementById("resultSlogan").textContent = profile.slogan;
  document.getElementById("resultSummary").textContent = profile.summary;
  document.getElementById("resultFit").textContent = profile.fit;
  document.getElementById("resultCaution").textContent = profile.caution;
  document.getElementById("resultUsage").textContent = profile.usage;

  renderAxes(latestCode);
  showScreen("result");
}

async function copyResult() {
  if (!latestCode) return;
  const profile = resultProfiles[latestCode];
  const text = [
    `나의 ETF 투자 유형은 ${latestCode} ‘${profile.title}’`,
    profile.slogan,
    "ETF 취향 연구소 테스트 결과"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

startButton.addEventListener("click", startTest);
brandButton.addEventListener("click", resetTest);
backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", startTest);
copyButton.addEventListener("click", copyResult);
