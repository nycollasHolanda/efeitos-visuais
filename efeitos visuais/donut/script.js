  const thetaSpacing = 0.07;
  const phiSpacing = 0.02;
  const R1 = 1;
  const R2 = 2;
  const K2 = 5;
  const screenWidth = 35;
  const screenHeight = 35;
  const K1 = (screenWidth * K2 * 3) / (8 * (R1 + R2));

  function renderFrame(A, B) {
    const cosA = Math.cos(A);
    const sinA = Math.sin(A);
    const cosB = Math.cos(B);
    const sinB = Math.sin(B);
    const charOutput = Array(screenHeight).fill().map(() => Array(screenWidth).fill(' '));
    const zBuffer = Array(screenHeight).fill().map(() => Array(screenWidth).fill(0));

    let theta = 0;
    while (theta < 2 * Math.PI) {
      theta += thetaSpacing;
      const costheta = Math.cos(theta);
      const sintheta = Math.sin(theta);
      let phi = 0;
      while (phi < 2 * Math.PI) {
        phi += phiSpacing;
        const cosphi = Math.cos(phi);
        const sinphi = Math.sin(phi);

        const circleX = R2 + R1 * costheta;
        const circleY = R1 * sintheta;

        const x = circleX * (cosB * cosphi + sinA * sinB * sinphi) - circleY * cosA * sinB;
        const y = circleX * (sinB * cosphi - sinA * cosB * sinphi) + circleY * cosA * cosB;
        const z = K2 + cosA * circleX * sinphi + circleY * sinA;

        const ooz = 1 / z;
        const xp = Math.floor(screenWidth / 2 + K1 * ooz * x);
        const yp = Math.floor(screenHeight / 2 - K1 * ooz * y);

        const L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi);

        if (L > 0) {
          if (ooz > zBuffer[yp][xp]) {
            zBuffer[yp][xp] = ooz;
            const luminanceIndex = Math.floor(L * 8);
            charOutput[yp][xp] = '.,-~:;=!*#$@'[luminanceIndex];
          }
        }
        phi += phiSpacing;
      }
      theta += thetaSpacing;
    }

    const outputDiv = document.getElementById('output');
    let output = '';
    for (let i = 0; i < screenHeight; i++) {
      let row = '';
      for (let j = 0; j < screenWidth; j++) {
        row += charOutput[i][j];
      }
      output += row + '\n';
    }

    outputDiv.textContent = output;
  }

  let A = 1.0;
  let B = 1.0;

  setInterval(() => {
    renderFrame(A, B);
    A += 0.08;
    B += 0.03;
  }, 1000 / 30);