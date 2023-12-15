const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "Made By Hayder , Ta7ya Emile Zola";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();

document.addEventListener("DOMContentLoaded", function () {
    // Add loaded class to body for reveal animation on load
    document.body.classList.add("loaded");

    // Add event listener for scroll to reveal animation
    window.addEventListener("scroll", revealOnScroll);
});

function revealOnScroll() {
    var elements = document.querySelectorAll(
        "header h1, header p, .left-sidebar h2, .left-sidebar p, .right-sidebar h2, .right-sidebar ul li"
    );

    elements.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.classList.add("visible");
        }
    });
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger initial reveal on page load
revealOnScroll();

// Add hover effect to the button
const btn = document.querySelector(".btn");

btn.addEventListener("mouseover", function () {
    btn.classList.add("hovered");
});

btn.addEventListener("mouseout", function () {
    btn.classList.remove("hovered");
});
