'use strict';

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const startDate = document.querySelector('[name="start_date"]');
if (startDate) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  startDate.min = localDate.toISOString().slice(0, 10);
}

document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  window.location.href = 'thanks.html';
});

const cancelModal = document.getElementById('cancel-guide');
const modalOpenButtons = document.querySelectorAll('.modal-open');
let lastModalOpenButton = null;
const modalCloseButtons = cancelModal?.querySelectorAll('[data-modal-close]');

const closeCancelModal = () => {
  if (!cancelModal) return;
  cancelModal.classList.remove('is-open');
  cancelModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
  lastModalOpenButton?.focus();
};

modalOpenButtons.forEach((button) => button.addEventListener('click', () => {
    if (!cancelModal) return;
    lastModalOpenButton = button;
    cancelModal.classList.add('is-open');
    cancelModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');
    cancelModal.querySelector('.cancel-modal-close')?.focus();
  }));

modalCloseButtons?.forEach((button) => button.addEventListener('click', closeCancelModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cancelModal?.classList.contains('is-open')) closeCancelModal();
});

const areaPages = {
  tokyo: {
    name: '東京電力エリア',
    description: '東京都、神奈川県、埼玉県、千葉県、栃木県、群馬県、茨城県、山梨県、静岡県（富士川以東）エリアにて電気のご案内をさせていただいております',
    areas: ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県', '栃木県', '群馬県', '山梨県', '静岡県（富士川以東）'],
    faq: '東京電力エリアは、東京都、神奈川県、埼玉県、千葉県、栃木県、群馬県、茨城県、山梨県、静岡県（富士川以東）になります。',
    support: 'https://www.tepco.co.jp/ep/support/index-j.html',
  },
  hokkaido: {
    name: '北海道電力エリア',
    description: '北海道エリアにて電気のご案内をさせていただいております',
    areas: ['北海道'],
    faq: '北海道電力エリアは、北海道のみになります。',
    support: 'https://www.hepco.co.jp/home/move/move01.html',
  },
  tohoku: {
    name: '東北電力エリア',
    description: '青森県、岩手県、宮城県、秋田県、山形県、福島県、新潟県エリアにて電気のご案内をさせていただいております',
    areas: ['青森県', '秋田県', '新潟県', '岩手県', '山形県', '宮城県', '福島県'],
    faq: '東北電力エリアは、青森県、岩手県、宮城県、秋田県、山形県、福島県、新潟県になります。',
    support: 'https://www.tohoku-epco.co.jp/dprivate/inquery/call/',
  },
  hokuriku: {
    name: '北陸電力エリア',
    description: '富山県、石川県、福井県嶺北地方および敦賀市、岐阜県飛騨市（旧神岡町全域、旧宮川村の一部のみ）および郡上市（旧白鳥町石徹白地区のみ）エリアにて電気のご案内をさせていただいております',
    areas: ['富山県', '石川県', '福井県嶺北地方および敦賀市', '岐阜県飛騨市（旧神岡町全域、旧宮川村の一部のみ）および郡上市（旧白鳥町石徹白地区のみ）'],
    faq: '北陸電力エリアは、富山県、石川県、福井県嶺北地方および敦賀市、岐阜県飛騨市（旧神岡町全域、旧宮川村の一部のみ）および郡上市（旧白鳥町石徹白地区のみ）になります。',
    support: 'https://www.rikuden.co.jp/tetsuzuki/',
  },
  chubu: {
    name: '中部電力エリア',
    description: '長野県、愛知県、岐阜県（飛騨市、郡上市、関ケ原町を除く）、三重県（熊野市の飛鳥町、有馬町、育生町、五郷町、井戸町、金山町、神川町、木本町、紀和町、久生屋町以南の地区を除く）、静岡県の富士川以西エリアにて電気のご案内をさせていただいております',
    areas: ['愛知県', '長野県', '岐阜県（飛騨市、郡上市、関ケ原町を除く）', '静岡県の富士川以西', '三重県（熊野市の飛鳥町、有馬町、育生町、五郷町、井戸町、金山町、神川町、木本町、紀和町、久生屋町以南の地区を除く）'],
    faq: '中部電力エリアは、長野県、愛知県、岐阜県（飛騨市、郡上市、関ケ原町を除く）、三重県（熊野市の飛鳥町、有馬町、育生町、五郷町、井戸町、金山町、神川町、木本町、紀和町、久生屋町以南の地区を除く）、静岡県の富士川以西になります。',
    support: 'https://miraiz.chuden.co.jp/home/procedures/',
  },
  kansai: {
    name: '関西電力エリア',
    description: '京都府、大阪府、滋賀県、兵庫県（赤穂市福浦を除く）、奈良県、和歌山県、福井県（三方郡美浜町以西）、三重県（新鹿町、磯崎町、大泊町、須野町、二木島里町、二木島町、波田須町、甫母町、遊木町を除く熊野市以南）、岐阜県不破郡関ケ原町の一部エリアにて電気のご案内をさせていただいております',
    areas: ['京都府', '奈良県', '福井県（三方郡美浜町以西）', '大阪府', '和歌山県', '岐阜県不破郡関ケ原町の一部', '滋賀県', '兵庫県（赤穂市福浦を除く）', '三重県（新鹿町、磯崎町、大泊町、須野町、二木島里町、二木島町、波田須町、甫母町、遊木町を除く熊野市以南）'],
    faq: '関西電力エリアは、京都府、大阪府、滋賀県、兵庫県（赤穂市福浦を除く）、奈良県、和歌山県、福井県（三方郡美浜町以西）、三重県（新鹿町、磯崎町、大泊町、須野町、二木島里町、二木島町、波田須町、甫母町、遊木町を除く熊野市以南）、岐阜県不破郡関ケ原町の一部になります。',
    support: 'https://kepco.jp/faq/otoiawase/#tel',
  },
  chugoku: {
    name: '中国電力エリア',
    description: '広島県、山口県、島根県、鳥取県、岡山県、兵庫県赤穂市（福浦）、香川県小豆郡、香川郡直島町、愛媛県越智郡上島町、今治市（伯方町・上浦町・大三島町・宮窪町（四阪島を除く）・吉海町・関前）エリアにて電気のご案内をさせていただいております',
    areas: ['広島県', '鳥取県', '山口県', '岡山県', '島根県', '兵庫県赤穂市（福浦）', '香川県小豆郡、香川郡直島町', '愛媛県越智郡上島町、今治市（伯方町・上浦町・大三島町・宮窪町（四阪島を除く）・吉海町・関前）'],
    faq: '中国電力エリアは、広島県、山口県、島根県、鳥取県、岡山県、兵庫県赤穂市（福浦）、香川県小豆郡、香川郡直島町、愛媛県越智郡上島町、今治市（伯方町・上浦町・大三島町・宮窪町（四阪島を除く）・吉海町・関前）になります。',
    support: 'https://www.energia.co.jp/office/add-sales.html',
  },
  shikoku: {
    name: '四国電力エリア',
    description: '香川県（小豆郡、香川郡直島町を除く）、徳島県、愛媛県（新居浜市別子山、越智郡上島町、今治市の伯方町・上浦町・大三島町・宮窪町・吉海町・関前を除く）、高知県エリアにて電気のご案内をさせていただいております',
    areas: ['高知県', '徳島県', '香川県（小豆郡、香川郡直島町を除く）', '愛媛県（新居浜市別子山、越智郡上島町、今治市の伯方町・上浦町・大三島町・宮窪町・吉海町・関前を除く）'],
    faq: '四国電力エリアは、香川県（小豆郡、香川郡直島町を除く）、徳島県、愛媛県（新居浜市別子山、越智郡上島町、今治市の伯方町・上浦町・大三島町・宮窪町・吉海町・関前を除く）、高知県になります。',
    support: 'https://www.yonden.co.jp/faq/tel.html',
  },
  kyushu: {
    name: '九州電力エリア',
    description: '福岡県、長崎県、大分県、佐賀県、宮崎県、熊本県、鹿児島県エリアにて電気のご案内をさせていただいております',
    areas: ['福岡県', '佐賀県', '鹿児島県', '長崎県', '宮崎県', '大分県', '熊本県'],
    faq: '九州電力エリアは、福岡県、長崎県、大分県、佐賀県、宮崎県、熊本県、鹿児島県になります。',
    support: 'https://customer.kyuden.co.jp/ja/moving/process.html',
  },
};

const activeAreaKey = document.body.dataset.area || 'tokyo';
const activeArea = areaPages[activeAreaKey] || areaPages.tokyo;

document.querySelectorAll('[data-area-tab]').forEach((tab) => {
  const isCurrent = tab.dataset.areaTab === activeAreaKey;
  tab.classList.toggle('is-current', isCurrent);
  if (isCurrent) tab.setAttribute('aria-current', 'page');
  else tab.removeAttribute('aria-current');
});

const serviceAreaLabel = document.querySelector('.service-labels strong');
const areaHeading = document.querySelector('.hero h1');
const areaDescription = document.querySelector('.hero-lead');
const areaSummaryHeading = document.querySelector('.area-summary h2');
const areaList = document.querySelector('.area-summary ul');
const areaFaq = document.querySelector('[data-area-faq]');
const supportLink = document.querySelector('.hero-actions .utility-button');

if (serviceAreaLabel) serviceAreaLabel.textContent = activeArea.name;
if (areaHeading) areaHeading.textContent = activeArea.name;
if (areaDescription) areaDescription.textContent = activeArea.description;
if (areaSummaryHeading) areaSummaryHeading.textContent = `${activeArea.name}全域で対応しています`;
if (areaList) areaList.innerHTML = activeArea.areas.map((area) => `<li>${area}</li>`).join('');
if (areaFaq) {
  areaFaq.querySelector('summary').textContent = `${activeArea.name}とはどこですか？`;
  areaFaq.querySelector('p').textContent = activeArea.faq;
}
if (supportLink) supportLink.href = activeArea.support;
document.title = `${activeArea.name}｜電気の開始・再開手続き専用窓口`;
