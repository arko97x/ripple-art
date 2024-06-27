// Delaying autoplaying-loop of tutorial animations
var singleTapVideo = document.getElementById('singleTapVideo');
var multiTapVideo = document.getElementById('multiTapVideo');
singleTapVideo.addEventListener('ended', function () {
    setTimeout(function () {
        singleTapVideo.play();
    }, 1500);
});
multiTapVideo.addEventListener('ended', function () {
    setTimeout(function () {
        multiTapVideo.play();
    }, 1710);
});

let rippleColor = '#0096ff';
let rippleShape = 'circle';

document.getElementById('colorPickerButton').addEventListener('click', function (event) {
    const colorPickerPopup = document.getElementById('colorPickerPopup');
    const shapePickerPopup = document.getElementById('shapePickerPopup');
    shapePickerPopup.style.display = 'none'; // Close shape picker popup if open
    colorPickerPopup.style.display = colorPickerPopup.style.display === 'grid' ? 'none' : 'grid';
    event.stopPropagation();
});

document.getElementById('colorPickerPopup').addEventListener('click', function (e) {
    if (e.target.dataset.color) {
        rippleColor = e.target.dataset.color;
        document.getElementById('colorSwatch').style.backgroundColor = rippleColor;
        document.getElementById('colorPickerPopup').style.display = 'none';
    }
    e.stopPropagation();
});

document.getElementById('shapePickerButton').addEventListener('click', function (event) {
    const shapePickerPopup = document.getElementById('shapePickerPopup');
    const colorPickerPopup = document.getElementById('colorPickerPopup');
    colorPickerPopup.style.display = 'none'; // Close color picker popup if open
    shapePickerPopup.style.display = shapePickerPopup.style.display === 'grid' ? 'none' : 'grid';
    event.stopPropagation();
});

document.getElementById('shapePickerPopup').addEventListener('click', function (e) {
    if (e.target.dataset.shape) {
        rippleShape = e.target.dataset.shape;
        let shapeSwatchSrc;
        if (rippleShape === 'circle') {
            shapeSwatchSrc = 'circle.svg';
        } else if (rippleShape === 'pentagon') {
            shapeSwatchSrc = 'pentagon.svg';
        } else if (rippleShape === 'triangle') {
            shapeSwatchSrc = 'triangle.svg';
        } else if (rippleShape === 'square') {
            shapeSwatchSrc = 'square.svg';
        }
        document.getElementById('shapeSwatch').src = shapeSwatchSrc;
        document.getElementById('shapePickerPopup').style.display = 'none';
    }
    e.stopPropagation();
});

document.getElementById('container').addEventListener('click', function (e) {
    const container = e.currentTarget;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - 50}px`;
    ripple.style.top = `${e.clientY - 50}px`;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "104");
    svg.setAttribute("height", "104");

    if (rippleShape === 'circle') {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "52");
        circle.setAttribute("cy", "52");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", rippleColor);
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
    } else if (rippleShape === 'pentagon') {
        const pentagon = document.createElementNS(svgNS, "polygon");
        pentagon.setAttribute("points", "50,0 100,38 82,100 18,100 0,38");
        pentagon.setAttribute("fill", "none");
        pentagon.setAttribute("stroke", rippleColor);
        pentagon.setAttribute("stroke-width", "2");
        svg.appendChild(pentagon);
    } else if (rippleShape === 'triangle') {
        const triangle = document.createElementNS(svgNS, "polygon");
        triangle.setAttribute("points", "50,20 80,70 20,70");
        triangle.setAttribute("fill", "none");
        triangle.setAttribute("stroke", rippleColor);
        triangle.setAttribute("stroke-width", "2");
        svg.appendChild(triangle);
    } else if (rippleShape === 'square') {
        svg.setAttribute("width", "100");
        svg.setAttribute("height", "100");

        const square = document.createElementNS(svgNS, "rect");
        square.setAttribute("x", "0");
        square.setAttribute("y", "0");
        square.setAttribute("width", "100");
        square.setAttribute("height", "100");
        square.setAttribute("fill", "none");
        square.setAttribute("stroke", rippleColor);
        square.setAttribute("stroke-width", "2");
        svg.appendChild(square);
    }

    ripple.appendChild(svg);
    container.appendChild(ripple);

    ripple.addEventListener('animationend', function () {
        container.removeChild(ripple);
    });
});

document.addEventListener('click', function () {
    const colorPickerPopup = document.getElementById('colorPickerPopup');
    const shapePickerPopup = document.getElementById('shapePickerPopup');
    colorPickerPopup.style.display = 'none';
    shapePickerPopup.style.display = 'none';
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const colorPickerPopup = document.getElementById('colorPickerPopup');
        const shapePickerPopup = document.getElementById('shapePickerPopup');
        colorPickerPopup.style.display = 'none';
        shapePickerPopup.style.display = 'none';
    }
});

document.getElementById('screenshotButton').addEventListener('click', function () {
    // Elements to exclude from the screenshot
    const elementsToExclude = document.querySelectorAll('.footer, .tooltip');
    // Hide the elements momentarily
    elementsToExclude.forEach(el => {
        el.style.visibility = 'hidden';
    });

    // Scale factor for higher resolution
    const scale = 5;

    // Take the screenshot with scaling
    domtoimage.toBlob(document.body, {
        width: document.body.clientWidth * scale,
        height: document.body.clientHeight * scale,
        style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: document.body.clientWidth + 'px',
            height: document.body.clientHeight + 'px'
        }
    })
        .then(function (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ripple-art.png';
            link.click();

            // Restore the visibility of excluded elements
            elementsToExclude.forEach(el => {
                el.style.visibility = 'visible';
            });
        })
        .catch(function (error) {
            console.error('Screenshot capture failed:', error);

            // Restore the visibility of excluded elements in case of an error
            elementsToExclude.forEach(el => {
                el.style.visibility = 'visible';
            });
        });
});

document.getElementById('aboutButton').addEventListener('click', function () {
    document.getElementById('aboutButtonContainer').children[1].style.visibility = 'hidden';
    const dialog = document.getElementById('aboutDialog');
    dialog.style.display = 'flex';
    setTimeout(() => {
        dialog.classList.add('show');
    }, 10);  // Small timeout to ensure the transition applies correctly
});

function closeDialog() {
    const dialog = document.getElementById('aboutDialog');
    dialog.classList.remove('show');
    setTimeout(() => {
        dialog.style.display = 'none';
    }, 100);
}

document.getElementById('closeDialogButton').addEventListener('click', closeDialog);
document.getElementById('dialogOverlay').addEventListener('click', closeDialog);