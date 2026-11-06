# Portfolio Template | Frontend Engineer & Creative Developer

Three.jsやGSAPを用いたリッチな3Dオブジェクト、パーティクル、マイクロインタラクションを備えた、モノトーン＋寒色の個人ポートフォリオサイトテンプレートです。
CDNを活用した構成のため、ビルド環境不要で即座に動作・編集が可能です。

---

## 🎨 デザインコンセプト
- **カラーパレット**: モノトーン（Deep Black / Slate / Pure White）＋ 寒色アクセント（Neon Cyan `#00f0ff` / Ice Blue `#38bdf8` / Cobalt `#3b82f6`）
- **ビジュアル演出**:
  - Three.jsによるリアルタイム3Dコアオブジェクト（多面体＋外周オービットリング）
  - 1,400個以上のパーティクルスタークラウド
  - マウス移動に連動する慣性パララックス＆ライティング追従
  - ページスクロール連動のカメラワーク・3Dオブジェクト変形
  - 各カードの3D Tiltインタラクション（マウスの傾きと動的なグレア発光）
  - GSAP ScrollTriggerによる滑らかなフェードイン＆タイムライン進行

---

## 🛠 技術スタック（All CDN-based）
- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Three.js (r128)**: 3Dキャンバス描画・インタラクティブシーン構築
- **Tailwind CSS (CDN)**: 高速かつレスポンシブなスタイリング
- **GSAP 3 & ScrollTrigger**: スクロール連動アニメーション
- **Lucide Icons**: ミニマルなアイコンセット
- **Google Fonts**: `Plus Jakarta Sans`, `JetBrains Mono`, `Noto Sans JP`

---

## 📁 ディレクトリ構成
```text
├── index.html          # メインHTML（個人情報・実績を書き換えて利用）
├── css/
│   └── style.css       # カスタムスタイル（グラスモーフィズム、発光、ノイズなど）
├── js/
│   ├── three-scene.js  # Three.js 3D背景・オブジェクト・パーティクル制御
│   └── main.js         # GSAPスクロールアニメーション、3D Tilt、フォーム制御
└── README.md
```

---

## 🚀 起動方法

### 方法1: 直接ブラウザで開く
ビルドステップは不要です。`index.html` をダブルクリックするか、任意のブラウザにドラッグ＆ドロップするだけで閲覧できます。

### 方法2: ローカルサーバーで確認する
```bash
# Pythonの場合
python3 -m http.server 3000
```
ブラウザで `http://localhost:3000` にアクセスしてください。

---

## ✏️ 編集・カスタマイズ箇所
- **プロフィール・自己紹介**: `index.html` の `#hero` および `#about` セクション
- **経歴・タイムライン**: `index.html` の `#experience` セクション
- **スキル一覧**: `index.html` の `#skills` セクション
- **制作実績（Works）**: `index.html` の `#works` セクション
- **連絡先 / SNS**: `index.html` の `#contact` セクション（メール、GitHubアカウントなど）
