import React, { useState, useRef, useEffect } from 'react';
import './ScreenTwo.css';
import ButtonDrawGames from '../../../components/ButtonDrawGame/ButtonDrawGames'
import { Link } from 'react-router-dom';
Link

const ScreenTwo = () => {
  const containerRef = useRef(null);
  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const groupRef = useRef(null);

  const [currentColor, setCurrentColor] = useState('#0075ff');
  const [currentSize, setCurrentSize] = useState(5);
  const [svgWidth, setSvgWidth] = useState(500);
  const [svgHeight, setSvgHeight] = useState(500);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [circles, setCircles] = useState([]);

  const handleColorChange = () => {
    setCurrentColor(colorInputRef.current.value);
  };

  const handleSizeChange = () => {
    setCurrentSize(sizeInputRef.current.value);
  };

  const handleMouseDown = (e) => {
    setInitialX(containerRef.current.clientWidth / svgWidth);
    setInitialY(containerRef.current.clientHeight / svgHeight);

    const mouseX = e.clientX || e.touches[0].clientX;
    const mouseY = e.clientY || e.touches[0].clientY;
    const relativeX = mouseX - containerRef.current.getBoundingClientRect().left;
    const relativeY = mouseY - containerRef.current.getBoundingClientRect().top;

    setCircles((prevCircles) => [
      ...prevCircles,
      {
        cx: relativeX / initialX,
        cy: relativeY / initialY,
        fill: currentColor,
        r: currentSize,
      },
    ]);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const mouseX = e.clientX || e.touches[0].clientX;
    const mouseY = e.clientY || e.touches[0].clientY;
    const relativeX = mouseX - containerRef.current.getBoundingClientRect().left;
    const relativeY = mouseY - containerRef.current.getBoundingClientRect().top;

    setCircles((prevCircles) => [
      ...prevCircles,
      {
        cx: relativeX / initialX,
        cy: relativeY / initialY,
        fill: currentColor,
        r: currentSize,
      },
    ]);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    return () => {
      containerRef.current.removeEventListener('mousedown', handleMouseDown);
    };
  }, [currentColor, currentSize, initialX, initialY]);

  useEffect(() => {
    setInitialX(containerRef.current.clientWidth / svgWidth);
    setInitialY(containerRef.current.clientHeight / svgHeight);
  }, [svgWidth, svgHeight]);

  return (
    <>

      <div className="screen-2-game-1">
        <Link to="/jogo1tela2"><img className='back-game-draw' src="../public/icon-button-left.svg" alt="" /></Link>
        <h1>Cachinhos cacheados</h1>
        <div className="title-game1">

        </div>
        <div className="container-draw2" ref={containerRef}>


          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="395.000000pt" height="404.000000pt" viewBox="0 0 395.000000 404.000000"
            preserveAspectRatio="xMidYMid meet">
            <g id="group" ref={groupRef}>
              {circles.map((circle, index) => (
                <circle key={index} cx={circle.cx} cy={circle.cy} fill={circle.fill} r={circle.r} />
              ))}
            </g>

            <g transform="translate(0.000000,404.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">



              <path d="M2096 3506 c-50 -19 -102 -62 -128 -106 l-20 -35 22 28 c12 15 42 39
67 54 79 46 198 30 256 -35 19 -20 18 -20 -34 -5 -136 40 -287 -61 -343 -231
-5 -16 -13 -18 -52 -12 -58 8 -129 -8 -176 -39 -47 -31 -50 -31 -71 4 l-17 29
32 20 c62 36 103 47 176 47 73 0 73 0 40 14 -19 9 -66 15 -108 15 -63 1 -84
-3 -127 -26 -46 -23 -53 -25 -64 -11 -25 30 -97 72 -157 92 -74 25 -159 27
-233 5 -172 -51 -226 -286 -88 -385 34 -24 118 -49 165 -49 33 0 169 38 162
45 -2 3 -30 0 -61 -5 -114 -18 -255 27 -297 95 -97 158 57 308 272 265 153
-30 290 -143 350 -289 20 -50 20 -54 1 55 -5 29 -2 34 41 59 60 35 111 46 159
35 21 -4 40 -10 42 -12 1 -1 5 -32 7 -66 l4 -64 -27 6 c-94 18 -189 -82 -189
-200 0 -130 87 -201 195 -159 79 30 115 118 82 198 -17 39 -67 77 -104 77 -23
0 -83 -45 -83 -63 0 -6 9 -1 20 11 59 63 154 14 167 -85 15 -110 -146 -141
-207 -40 -54 88 17 247 111 247 36 0 39 -3 62 -54 55 -120 146 -179 274 -180
l72 0 -35 -42 c-40 -50 -78 -122 -93 -181 -11 -41 -13 -42 -39 -32 -15 6 -51
20 -79 31 -29 11 -53 22 -53 24 0 3 12 16 28 30 l27 26 -29 -21 c-107 -78
-260 -28 -332 110 l-15 31 -32 -53 c-38 -63 -112 -122 -181 -145 -29 -10 -82
-17 -127 -17 -67 0 -87 5 -136 29 -71 36 -101 89 -113 196 l-7 73 -1 -65 c-1
-39 6 -86 17 -117 14 -43 15 -53 4 -53 -15 0 -14 -1 -38 82 -18 68 -63 124
-120 149 -58 27 -147 25 -210 -5 -60 -28 -127 -99 -143 -154 -26 -86 -5 -179
51 -230 l25 -24 -33 -43 c-18 -24 -35 -50 -37 -57 -4 -10 -10 -10 -32 0 -36
16 -119 15 -160 -2 -74 -31 -135 -123 -143 -218 -10 -104 41 -190 111 -187 30
2 30 2 4 6 -15 2 -41 17 -57 32 -117 109 3 361 172 361 78 0 134 -55 162 -158
9 -31 13 -39 14 -22 1 42 -17 102 -39 132 -31 42 -20 72 51 142 49 46 65 57
85 53 l25 -4 -20 21 c-84 90 -24 267 82 241 29 -8 75 -49 88 -80 7 -17 8 -18
8 -2 1 9 -14 33 -32 52 -83 91 -197 30 -197 -106 0 -33 6 -63 15 -75 20 -27
19 -30 -19 -52 l-35 -21 -27 36 c-81 107 -67 238 34 308 40 27 51 30 120 30
61 0 87 -5 124 -24 58 -30 102 -74 123 -123 14 -35 14 -38 0 -38 -9 0 -30 7
-48 15 l-32 16 30 -26 c17 -14 75 -48 130 -76 138 -69 164 -95 103 -101 -39
-4 -78 -55 -78 -102 l0 -31 16 32 c17 34 66 63 94 56 24 -6 40 -51 28 -82 -7
-20 -6 -22 7 -11 30 25 29 75 -2 133 l-30 55 96 4 c74 3 106 9 138 26 61 32
111 78 142 134 l28 48 30 -49 c23 -37 44 -55 87 -76 51 -25 64 -27 123 -22
l65 6 -6 -40 c-14 -87 -74 -162 -140 -174 -44 -9 -102 16 -143 60 -29 32 -37
35 -86 35 -86 0 -171 -66 -192 -151 -6 -25 -10 -26 -51 -21 -52 6 -70 -6 -83
-56 -9 -29 -7 -38 7 -48 22 -17 59 -18 65 -1 4 10 -2 13 -19 9 -20 -4 -24 0
-24 22 0 18 8 30 30 41 40 21 77 10 101 -29 27 -45 24 -82 -10 -117 -25 -25
-37 -29 -81 -29 -67 0 -115 24 -147 72 -27 40 -33 45 -33 28 0 -23 89 -106
117 -109 53 -8 100 -3 130 12 57 30 68 114 22 163 -59 63 68 184 192 184 37 0
38 -1 44 -43 16 -105 85 -167 188 -167 133 0 228 90 226 215 l-1 50 -9 -38
c-31 -134 -148 -223 -260 -198 -44 10 -92 49 -116 95 l-15 28 34 -25 c44 -33
71 -40 120 -32 77 13 158 120 158 209 0 14 3 26 8 26 4 0 39 -13 77 -29 l70
-28 7 -62 c8 -74 41 -135 98 -184 22 -18 40 -37 40 -40 0 -8 -100 -64 -167
-93 -32 -14 -44 -22 -28 -19 17 4 56 18 87 32 l56 25 30 -33 c28 -32 34 -34
94 -34 50 0 70 5 96 24 18 13 31 25 29 27 -2 3 -24 -1 -49 -7 -55 -15 -97 -3
-118 34 -8 14 -12 29 -8 32 3 4 37 -3 75 -15 50 -16 87 -21 142 -18 l75 3 24
-60 c14 -33 30 -82 37 -110 11 -48 13 -50 54 -59 33 -7 44 -6 54 6 14 17 42
28 147 58 96 28 136 53 170 107 15 24 46 57 69 73 22 16 54 53 71 82 40 70 38
83 -2 22 -69 -101 -202 -143 -299 -94 l-44 23 20 -23 c26 -29 79 -50 126 -50
22 0 39 -4 39 -8 0 -15 -92 -59 -180 -87 -46 -14 -99 -35 -118 -47 -18 -11
-35 -19 -36 -17 -2 2 -15 27 -29 54 -14 28 -39 70 -56 94 l-30 45 69 33 c72
35 117 79 148 145 9 21 19 37 22 37 3 0 19 -19 35 -41 42 -58 76 -80 132 -85
81 -8 158 37 206 120 37 64 45 101 9 47 -58 -88 -108 -120 -188 -120 -55 0
-100 18 -147 59 l-36 32 2 100 c2 98 2 100 27 106 84 23 181 -21 248 -110 l22
-31 0 37 c0 20 -11 61 -24 91 -20 45 -37 65 -90 103 -74 53 -80 71 -51 153 19
55 19 75 -1 30 -21 -50 -42 -69 -86 -81 -28 -7 -49 -7 -72 1 -33 11 -79 52
-89 80 -4 12 -6 12 -6 -2 -2 -29 48 -77 91 -89 32 -8 50 -7 84 4 l44 14 0 -28
c0 -27 -3 -29 -41 -29 -23 0 -58 -5 -79 -11 -37 -11 -38 -11 -80 35 -62 67
-131 98 -224 99 -42 1 -76 3 -76 5 0 2 5 13 11 25 8 16 4 14 -13 -6 -31 -38
-194 -96 -269 -97 -51 0 -127 30 -171 69 -94 84 -133 248 -81 347 30 56 103
127 158 154 83 40 158 26 221 -42 41 -43 55 -70 75 -148 10 -36 18 -55 18 -43
1 12 6 25 13 29 15 10 3 -95 -18 -144 -58 -140 -241 -172 -356 -62 -54 52 -61
49 -22 -10 33 -49 110 -90 171 -90 86 0 168 52 211 133 25 48 27 60 26 162 -1
76 -6 124 -18 154 -20 55 -20 54 7 40 52 -28 91 -101 103 -195 8 -66 30 -108
71 -135 41 -28 45 -23 18 17 -45 66 -34 177 21 225 51 44 126 28 195 -41 38
-38 46 -43 35 -21 -23 43 -91 99 -136 111 -82 22 -147 -16 -176 -103 l-17 -52
-13 64 c-18 85 -58 150 -110 176 -22 12 -58 39 -80 61 -74 74 -175 107 -248
80z m559 -700 c42 -20 142 -106 123 -106 -3 0 -27 10 -54 22 -64 29 -186 31
-262 5 -116 -41 -202 -145 -202 -245 0 -64 42 -132 102 -164 54 -28 157 -31
205 -5 39 21 79 72 88 112 6 28 5 28 -15 -8 -56 -102 -204 -102 -246 0 -20 48
-11 79 36 124 111 106 304 85 370 -39 10 -20 19 -30 20 -22 0 24 -36 76 -72
103 -98 74 -237 58 -336 -40 -32 -31 -55 -64 -58 -83 -10 -45 -29 -31 -32 24
-12 188 297 301 449 164 52 -46 74 -105 74 -198 0 -73 -4 -92 -27 -136 -57
-108 -170 -169 -312 -167 -312 4 -443 282 -254 538 42 55 116 112 173 133 17
6 64 11 105 11 59 1 86 -4 125 -23z m363 -140 c72 -37 142 -123 142 -174 0
-13 -14 -5 -54 34 -61 59 -140 90 -206 81 -33 -4 -41 -1 -60 25 -23 31 -19 42
15 51 35 10 131 0 163 -17z"/>
              <path d="M2138 3234 c-59 -31 -76 -124 -35 -185 28 -42 88 -65 132 -51 29 10
29 10 -13 11 -34 1 -50 7 -73 30 -36 36 -37 70 -4 109 34 41 84 49 138 23 22
-11 42 -19 44 -17 9 8 -54 70 -84 82 -41 18 -71 17 -105 -2z"/>
              <path d="M1165 3201 c-46 -28 -66 -56 -72 -98 -5 -35 -2 -42 31 -70 58 -51
177 -58 220 -12 l21 21 -24 -12 c-35 -18 -135 -8 -169 17 -42 31 -43 85 -2
123 41 39 90 47 163 28 61 -16 66 -9 8 11 -53 17 -141 14 -176 -8z"/>
              <path d="M2811 3064 c-35 -29 -58 -94 -42 -122 9 -15 10 -13 11 9 0 36 40 92
73 103 31 11 78 -1 85 -22 3 -9 -4 -11 -25 -7 -25 5 -25 4 7 -11 19 -9 45 -25
58 -37 29 -27 28 -14 -3 38 -45 78 -108 96 -164 49z"/>
              <path d="M1518 3024 c-19 -103 -161 -210 -287 -215 -22 -1 -21 -2 9 -10 79
-20 183 14 242 79 39 43 51 83 46 147 l-3 40 -7 -41z"/>
              <path d="M3207 3041 c-75 -15 -166 -106 -167 -165 0 -14 5 -11 23 14 81 120
250 69 265 -79 7 -77 -19 -135 -77 -173 -25 -17 -38 -28 -28 -24 10 3 23 6 27
6 18 0 82 64 101 101 26 53 26 152 -1 197 -28 45 -76 72 -130 72 -42 1 -44 2
-26 15 12 9 41 15 71 15 78 0 125 -40 145 -123 32 -129 -53 -297 -183 -362
-29 -14 -43 -25 -31 -25 61 0 161 87 206 177 45 92 50 183 15 255 -41 82 -116
117 -210 99z"/>
              <path d="M2834 2851 c22 -24 68 -28 86 -6 10 12 6 13 -23 8 -19 -3 -45 0 -58
7 -24 13 -24 13 -5 -9z"/>
              <path d="M3077 2833 c-13 -12 -7 -74 9 -98 19 -28 74 -49 106 -40 42 13 68 46
67 84 -1 20 -3 27 -6 16 -2 -11 -6 -30 -9 -43 -3 -15 -18 -29 -39 -38 -30 -12
-39 -12 -69 0 -42 17 -59 47 -54 92 4 37 4 37 -5 27z"/>
              <path d="M850 2368 c-60 -33 -101 -93 -108 -156 -2 -27 1 -58 7 -68 9 -16 10
-13 11 21 1 117 112 215 227 202 32 -3 42 -2 34 6 -6 6 -37 12 -68 15 -47 3
-67 -1 -103 -20z"/>
              <path d="M926 2290 c-61 -19 -120 -112 -100 -159 5 -11 9 -5 15 22 18 77 77
126 154 128 40 1 45 3 25 9 -32 10 -58 10 -94 0z"/>
              <path d="M411 2208 c-56 -38 -75 -71 -79 -142 -4 -59 -2 -65 27 -99 18 -19 45
-38 60 -42 23 -5 33 -17 49 -53 l19 -47 -4 46 c-5 45 -5 45 34 57 47 14 120
86 128 127 5 27 5 28 -5 6 -45 -102 -157 -150 -237 -101 -44 26 -56 54 -51
112 8 78 65 139 132 141 41 1 65 -17 84 -66 l12 -32 -6 30 c-13 73 -100 106
-163 63z"/>
              <path d="M932 2185 c-35 -29 -57 -81 -39 -88 7 -3 13 6 14 21 2 41 46 76 105
83 l53 6 -52 2 c-42 1 -57 -4 -81 -24z"/>
              <path d="M1175 2190 c10 -11 20 -20 23 -20 3 0 -3 9 -13 20 -10 11 -20 20 -23
20 -3 0 3 -9 13 -20z"/>
              <path d="M925 2083 c6 -5 29 -24 53 -42 65 -50 102 -122 102 -196 -1 -236
-285 -303 -431 -102 -39 54 -37 33 2 -27 70 -106 179 -147 305 -115 62 16 74
4 67 -70 -8 -82 26 -153 112 -236 36 -35 65 -66 65 -69 0 -9 -69 -24 -92 -20
-14 3 -11 0 7 -7 17 -7 31 -13 33 -14 7 -6 -23 -55 -33 -55 -18 0 -94 86 -111
125 -25 61 -35 125 -25 161 12 45 -4 34 -20 -13 -32 -99 31 -253 127 -309 45
-27 114 -35 160 -21 16 6 23 2 32 -19 19 -41 7 -47 -82 -41 -136 10 -238 57
-318 146 l-37 40 40 39 c21 22 39 45 39 52 0 6 -12 -2 -26 -20 -36 -42 -74
-60 -128 -60 -58 0 -112 43 -122 97 -14 72 52 148 95 109 32 -29 46 -73 32
-102 -15 -33 -14 -34 8 -34 44 0 62 68 31 118 -75 120 -233 -13 -169 -143 28
-58 88 -80 168 -65 20 4 27 -1 38 -28 13 -33 13 -33 -21 -47 -51 -21 -139 -19
-185 5 -76 38 -114 118 -93 196 28 103 108 174 212 185 l55 6 -47 2 c-26 0
-59 -4 -74 -9 -23 -9 -25 -9 -15 4 7 8 31 19 54 25 l42 9 -39 1 c-35 1 -45 -5
-105 -67 -36 -38 -74 -78 -83 -90 -13 -16 -29 -22 -58 -22 -78 0 -154 60 -179
140 l-11 35 5 -32 c11 -81 109 -163 192 -163 33 0 34 -1 28 -33 -15 -78 48
-183 122 -208 48 -15 128 -14 178 4 l40 14 54 -49 c96 -87 212 -130 355 -131
77 -1 79 -1 97 -31 11 -19 19 -50 19 -78 0 -39 -6 -54 -31 -83 -39 -44 -97
-62 -136 -41 -30 15 -57 42 -66 66 -4 12 -6 11 -6 -2 -1 -24 62 -93 98 -108
24 -10 35 -8 67 8 70 36 89 65 89 137 l0 63 52 -47 c29 -26 52 -55 52 -66 1
-30 -25 -62 -67 -85 -20 -10 -30 -19 -22 -20 26 0 78 38 95 70 9 17 19 30 23
28 218 -111 288 -131 457 -130 136 0 234 24 360 86 50 25 113 65 142 90 28 26
53 46 56 46 2 0 2 -20 0 -44 -11 -95 59 -177 157 -184 67 -5 103 18 121 78 30
100 -86 191 -165 129 -35 -28 -35 -70 0 -98 35 -28 76 -27 100 2 19 22 19 22
-2 4 -27 -23 -69 -22 -94 3 -32 32 -25 66 17 89 46 24 96 5 122 -46 32 -62
-15 -133 -89 -133 -106 0 -183 107 -146 205 16 41 64 99 101 122 15 9 16 11 3
7 -23 -8 -23 -8 15 64 33 61 33 61 56 46 56 -40 147 -38 208 3 30 20 34 21 28
6 -41 -96 -45 -150 -15 -208 15 -30 17 -41 7 -47 -20 -13 -90 -8 -117 7 -38
22 -46 18 -15 -7 34 -27 64 -91 65 -138 0 -54 -38 -121 -85 -148 -22 -13 -31
-21 -20 -17 99 32 159 148 122 238 -9 20 -13 38 -9 41 4 2 28 6 53 10 34 5 49
3 58 -7 6 -8 32 -20 57 -27 141 -40 289 129 209 237 -11 15 -11 10 0 -23 18
-52 6 -100 -32 -136 -101 -96 -249 -36 -261 105 -8 100 39 180 124 213 64 24
136 7 197 -46 59 -53 87 -113 88 -192 0 -45 3 -57 9 -43 26 61 -7 171 -72 236
-65 65 -198 85 -272 41 -21 -13 -40 -21 -42 -20 -2 2 3 22 11 43 27 75 16 149
-31 217 -33 47 -41 48 -36 4 6 -48 -12 -96 -53 -143 -46 -54 -87 -71 -118 -50
-29 19 -29 28 -3 195 l20 122 28 0 c32 0 38 -16 9 -25 -32 -10 -34 -36 -6 -64
22 -22 27 -24 35 -11 5 8 9 24 9 35 -1 20 -2 18 -15 -24 -4 -12 -8 -12 -22 2
-13 14 -14 21 -6 35 6 9 14 16 18 15 3 -2 16 7 27 18 17 17 23 19 30 8 30 -48
-14 -164 -89 -230 -26 -23 -37 -37 -26 -31 12 6 42 34 68 63 49 54 69 107 65
169 -2 21 2 44 9 52 10 12 3 13 -48 5 -75 -12 -90 -6 -90 36 0 23 -8 41 -26
58 -14 13 -39 47 -56 74 -16 28 -26 39 -22 25 9 -32 38 -89 62 -118 17 -22 17
-31 6 -140 -44 -415 -185 -652 -468 -782 -116 -54 -201 -72 -331 -71 -323 1
-592 187 -714 493 -28 69 -71 260 -71 313 l0 24 36 -24 c20 -14 41 -25 45 -25
15 0 10 16 -11 35 -41 37 -67 175 -41 223 6 11 11 29 11 39 0 10 -9 -1 -20
-24 -13 -30 -25 -43 -40 -43 -11 0 -20 -7 -20 -15 0 -19 -42 -29 -119 -26
l-35 1 31 33 c40 42 55 71 68 134 10 48 14 55 55 75 49 26 78 72 85 135 l5 38
-10 -39 c-14 -55 -47 -104 -80 -121 -42 -21 -48 -19 -59 21 -13 48 -55 108
-100 143 -35 28 -96 63 -76 44z m240 -570 c4 -43 13 -116 21 -163 7 -46 11
-86 9 -88 -7 -8 -64 38 -94 77 -17 22 -40 59 -51 82 -19 42 -27 119 -14 132
13 12 43 -40 46 -79 4 -48 32 -59 49 -20 11 24 8 29 -40 72 -28 25 -51 50 -51
55 0 5 27 9 59 9 l59 0 7 -77z m-45 -28 c10 -12 10 -18 0 -30 -19 -23 -30 -18
-30 15 0 33 11 38 30 15z m1904 -125 c29 -72 15 -148 -37 -207 -39 -45 -82
-63 -147 -63 -55 0 -114 24 -106 43 2 7 10 29 17 50 9 29 16 36 28 31 9 -4 28
-9 44 -12 15 -2 27 -7 27 -11 0 -4 7 -16 16 -27 14 -18 15 -18 4 4 -10 21 -7
27 36 65 48 42 83 104 84 145 0 34 16 26 34 -18z m-1791 -201 c9 -23 14 -46
10 -52 -5 -9 -89 -5 -99 5 -7 8 24 76 38 81 27 11 36 6 51 -34z"/>
              <path d="M3298 2061 c-50 -20 -112 -60 -104 -68 2 -3 20 6 38 20 45 33 91 47
155 47 65 0 117 -20 161 -63 41 -39 58 -70 76 -139 l15 -53 0 41 c1 60 -27
131 -66 169 -65 63 -181 82 -275 46z"/>
              <path d="M803 2021 c-79 -49 -85 -183 -11 -235 32 -23 100 -20 132 5 20 16 25
17 20 4 -9 -23 -58 -45 -102 -45 -49 0 -101 34 -124 80 -10 19 -18 29 -18 22
0 -22 27 -66 59 -96 41 -39 129 -48 177 -18 88 56 81 204 -13 266 -55 36 -83
40 -120 17z m74 -18 c45 -21 73 -67 73 -118 0 -52 -21 -82 -67 -94 -78 -22
-140 39 -130 128 4 34 13 52 36 73 37 33 42 33 88 11z"/>
              <path d="M1532 1979 c-47 -8 -159 -55 -150 -64 1 -1 32 3 68 11 94 20 191 3
303 -53 27 -13 52 -22 55 -19 11 12 -55 82 -99 103 -55 28 -108 34 -177 22z
m165 -26 c26 -12 74 -63 59 -63 -2 0 -32 11 -67 24 -35 13 -88 27 -117 31 -58
8 -60 13 -10 25 41 9 93 2 135 -17z"/>
              <path d="M2292 1971 c-52 -18 -104 -57 -124 -94 -12 -23 -3 -34 16 -18 23 19
167 68 221 75 30 4 76 0 115 -8 36 -8 67 -12 68 -11 9 9 -100 54 -153 64 -75
14 -80 14 -143 -8z m151 -11 c4 -3 -22 -12 -58 -19 -36 -6 -89 -21 -117 -32
-28 -11 -53 -17 -56 -15 -11 12 62 66 101 74 42 10 116 5 130 -8z"/>
              <path d="M3169 1963 c-13 -16 -12 -17 4 -4 16 13 21 21 13 21 -2 0 -10 -8 -17
-17z"/>
              <path d="M3325 1958 c-37 -20 -64 -50 -70 -80 -5 -22 -19 -34 -58 -54 -29 -14
-67 -40 -84 -57 l-33 -31 0 30 c0 34 -30 83 -62 100 -13 8 -55 13 -95 14 -39
0 -84 5 -99 10 -35 14 -41 7 -20 -24 17 -26 57 -41 140 -51 96 -13 125 -89 69
-184 -23 -41 -24 -44 -5 -27 l22 19 0 -64 c1 -150 106 -249 251 -236 110 10
185 83 196 193 6 59 6 59 19 29 7 -16 13 -61 13 -100 1 -88 -28 -155 -90 -209
-24 -21 -33 -33 -20 -26 45 23 110 91 123 128 19 58 14 179 -11 232 -22 49
-31 62 -75 100 l-28 25 26 -45 c47 -83 27 -190 -46 -242 -28 -19 -45 -23 -114
-23 -71 0 -85 3 -122 28 -120 79 -131 222 -27 345 31 37 100 72 175 89 50 11
51 12 15 11 -48 -2 -49 13 -4 55 25 23 36 27 62 22 83 -17 157 -111 157 -199
0 -30 3 -37 10 -26 16 25 11 122 -9 165 -29 65 -72 95 -134 95 -29 0 -61 -6
-72 -12z"/>
              <path d="M408 1893 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
              <path d="M588 1749 c28 -46 29 -63 3 -49 -75 40 -171 -38 -171 -139 0 -145
143 -164 205 -28 23 49 23 55 11 112 -17 77 -30 107 -52 125 -15 12 -14 9 4
-21z m-31 -94 c46 -33 38 -124 -15 -165 -34 -27 -67 -25 -91 6 -33 42 -25 110
19 154 24 24 57 26 87 5z"/>
              <path d="M1472 1747 c-28 -8 -41 -15 -37 -24 3 -7 8 -20 11 -28 8 -20 -40 -31
-73 -16 -32 15 -41 7 -24 -20 16 -27 9 -33 -39 -31 -39 3 -40 2 -28 -22 6 -14
23 -31 38 -38 19 -8 30 -23 38 -53 15 -55 44 -90 106 -125 42 -24 63 -30 115
-30 71 0 198 33 221 58 13 14 13 15 0 5 -28 -21 -163 -53 -220 -53 -67 0 -126
26 -164 71 -25 29 -28 39 -24 84 3 32 13 64 27 83 24 35 46 43 37 15 -3 -10
-8 -31 -12 -48 l-7 -30 22 22 c24 25 46 21 55 -9 10 -42 -25 -73 -52 -46 -21
21 -14 -16 11 -53 52 -79 141 -87 209 -19 43 42 51 71 17 63 -24 -7 -39 11
-39 45 0 27 26 39 51 24 17 -11 18 -9 12 18 -8 44 10 37 46 -17 33 -49 41 -51
17 -4 -17 32 -83 94 -123 114 -15 8 -47 20 -69 26 -47 13 -68 41 -31 41 36 0
135 -28 165 -47 26 -17 27 -17 12 1 -40 50 -159 69 -268 43z m38 -28 c0 -11
-3 -18 -7 -16 -5 2 -17 7 -28 11 -16 6 -17 9 -5 16 24 16 40 11 40 -11z"/>
              <path d="M2285 1746 c-17 -7 -36 -20 -44 -29 -11 -14 -6 -13 33 4 60 26 151
38 144 18 -2 -7 -31 -23 -64 -34 -33 -11 -77 -34 -99 -50 -41 -32 -95 -108
-95 -134 0 -9 9 2 19 24 10 22 30 51 44 64 l26 24 -6 -39 c-6 -38 -5 -38 13
-22 35 30 67 -7 48 -56 -7 -19 -35 -21 -53 -3 -11 10 -12 7 -6 -13 35 -115
161 -142 238 -51 32 39 34 51 7 51 -13 0 -22 9 -26 27 -9 33 7 59 35 56 24 -3
24 -3 11 31 -18 48 27 21 55 -33 23 -45 16 -113 -16 -148 -35 -38 -97 -63
-158 -63 -57 0 -158 23 -203 46 -16 8 -28 10 -28 5 0 -17 162 -61 223 -61 63
0 113 17 164 56 34 26 73 90 73 121 1 10 15 27 33 38 17 11 33 28 35 38 3 14
-4 17 -37 17 -40 0 -40 1 -34 30 5 30 5 30 -20 19 -33 -15 -81 -4 -73 16 3 8
9 22 12 30 4 10 0 15 -14 15 -11 0 -22 -6 -25 -14 -3 -7 -15 -16 -26 -19 -16
-4 -21 0 -21 14 0 13 7 19 23 20 21 0 21 1 2 9 -31 13 -157 11 -190 -4z"/>
              <path d="M3400 1733 c88 -62 136 -143 150 -252 l9 -66 -3 76 c-4 118 -45 189
-137 237 -24 13 -33 15 -19 5z"/>
              <path d="M3215 1728 c-114 -40 -121 -210 -10 -262 97 -46 188 13 161 104 l-10
35 -5 -39 c-4 -27 -15 -45 -33 -59 -24 -18 -32 -19 -67 -9 -54 17 -91 62 -91
114 0 32 7 47 34 74 31 31 40 34 93 35 41 0 52 3 38 9 -27 12 -73 11 -110 -2z"/>
              <path d="M3351 1716 c2 -2 15 -9 29 -15 24 -11 24 -11 6 3 -16 13 -49 24 -35
12z"/>
              <path d="M301 1604 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
              <path d="M1801 1504 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
              <path d="M921 1324 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
              <path d="M2030 1244 c0 -6 7 -19 16 -30 14 -18 14 -18 3 6 -14 31 -19 36 -19
24z"/>
              <path d="M1890 1143 c0 -6 8 -17 18 -24 16 -13 16 -13 2 6 -8 11 -16 22 -17
24 -2 2 -3 0 -3 -6z"/>
              <path d="M2057 1133 c-4 -3 -7 -11 -7 -17 0 -6 5 -5 12 2 6 6 9 14 7 17 -3 3
-9 2 -12 -2z"/>
              <path d="M3100 1107 c-13 -7 -31 -29 -38 -50 -39 -100 84 -213 159 -146 l24
21 -25 -16 c-40 -26 -78 -20 -116 18 -47 47 -50 116 -7 155 35 31 97 25 150
-15 27 -19 33 -21 20 -7 -41 47 -117 65 -167 40z"/>
              <path d="M870 1061 c0 -6 4 -13 10 -16 6 -3 7 1 4 9 -7 18 -14 21 -14 7z" />
              <path d="M1720 1020 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"/>
              <path d="M2224 1020 c-6 -6 -35 -14 -65 -17 -46 -6 -50 -8 -24 -13 29 -6 29
-6 -20 -23 -82 -29 -153 -32 -221 -11 l-59 19 130 5 130 6 -130 2 c-71 2 -150
7 -175 12 -41 7 -43 7 -25 -7 11 -8 45 -27 75 -42 46 -22 69 -26 140 -26 80 0
90 2 177 45 51 25 92 48 93 53 0 10 -14 9 -26 -3z"/>
              <path d="M1000 926 c0 -14 72 -40 151 -56 102 -20 139 -40 139 -75 0 -52 -53
-71 -91 -32 -20 20 -21 21 -11 1 18 -35 39 -46 72 -39 63 14 80 86 30 129 -29
24 -44 28 -175 42 -33 3 -72 12 -87 20 -16 8 -28 12 -28 10z"/>
              <path d="M1920 834 c36 -17 115 -13 134 6 5 5 -7 5 -29 -1 -37 -10 -74 -9
-120 5 -11 4 -4 -1 15 -10z"/>
              <path d="M1368 643 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z" />
            </g>


          </svg>
          <div className="options-game2">
            <div className="color-options">
              <label htmlFor="color-input">Cor: </label>
              <input type="color" id="color-input" value={currentColor} onChange={handleColorChange} ref={colorInputRef} />
            </div>
            <div className="size-game2">
              <label htmlFor="size-input">Tamanho do pincel:</label>
              <input type="range" min="5" max="100" value={currentSize} id="size-input" onChange={handleSizeChange} ref={sizeInputRef} style={{ borderRadius: "50px" }} />
            </div>
          </div>
          <div className="button-game1-draw1">
            <Link to="/jogo1tela3">
              <ButtonDrawGames props_button_draw={"Avançar"} />
            </Link>
          </div>

        </div>

      </div>

    </>
  );
};

export default ScreenTwo;
