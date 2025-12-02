document.addEventListener('DOMContentLoaded', function() {
    
    // 要素を取得
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // ページ内のすべての画像を取得し、リスト化する
    // Array.fromを使うことで、後で順番(index)を扱いやすくする
    const images = Array.from(document.querySelectorAll('.photo-item img'));
    let currentIndex = 0; // 現在表示している画像の番号

    // 画像を表示する関数
    function showImage(index) {
        if (index >= 0 && index < images.length) {
            modalImg.src = images[index].src;
            currentIndex = index;
        }
    }

    // 各画像にクリックイベントを設定
    images.forEach((img, index) => {
        img.onclick = function() {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            showImage(index); // クリックされた画像の番号で表示
        }
    });

    // 「次へ」ボタン
    nextBtn.onclick = function(e) {
        e.stopPropagation(); // 親要素へのイベント伝播を止める（背景クリックで閉じるのを防ぐ）
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0; // 最後まで行ったら最初に戻る
        }
        showImage(currentIndex);
    }

    // 「前へ」ボタン
    prevBtn.onclick = function(e) {
        e.stopPropagation();
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // 最初まで行ったら最後に戻る
        }
        showImage(currentIndex);
    }

    // 閉じるボタン
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 背景クリックで閉じる
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // キーボード操作（矢印キーで移動、Escで閉じる）
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowRight") {
                nextBtn.click(); // 右矢印で「次へ」
            } else if (e.key === "ArrowLeft") {
                prevBtn.click(); // 左矢印で「前へ」
            } else if (e.key === "Escape") {
                closeBtn.click(); // Escキーで閉じる
            }
        }
    });
});