const customFont = () =>
  `
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_extrabold.woff2') format("woff2");
    font-weight: 800;
    font-style: normal;
    }
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_bold.woff2') format("woff2");
    font-weight: 700;
    font-style: normal;
    }
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_semibold.woff2') format("woff2");
    font-weight: 600;
    font-style: normal;
    }
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_regular.woff2') format("woff2");
    font-weight: 500;
    font-style: normal;
    }
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_light.woff2') format("woff2");
    font-weight: 400;
    font-style: normal;
    }
    @font-face {
    font-family: "proxima nova";
    src: url('/fonts/proxima_nova_thin.woff2') format("woff2");
    font-weight: 300;
    font-style: normal;
    }
`;

export { customFont };
