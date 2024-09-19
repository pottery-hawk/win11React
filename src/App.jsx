import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import "./i18nextConf";
import "./index.css";

import ActMenu from "./components/menu";
import {
  BandPane,
  CalnWid,
  DesktopApp,
  SidePane,
  StartMenu,
  WidPane,
} from "./components/start";
import Taskbar from "./components/taskbar";
import { Background, BootScreen, LockScreen, StickyNote } from "./containers/background";

import { loadSettings } from "./actions";
import * as Applications from "./containers/applications";
import * as Drafts from "./containers/applications/draft";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - Page</title>
      <script src="https://win11.blueedge.me/script.js"></script>
      <link rel="stylesheet" href="https://win11.blueedge.me/style.css" />
      {/* partial:index.partial.html */}
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>
            Your PC ran into a problem and needs to restart. We're just
            collecting some error info, and then we'll restart for you.
          </h2>
          <h2>
            <span id="percentage">0</span>% complete
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image">
                <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://microsoft.com">
                  https://microsoft.com
                </a>{" "}
              </h4>
              <h5>
                If you call a support person, give them this info:
                <br />
                Stop Code: {error.message}
              </h5>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
    </div>
  );
}

function App() {
  const apps = useSelector((state) => state.apps);
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();

  const afterMath = (event) => {
    var ess = [
      ["START", "STARTHID"],
      ["BAND", "BANDHIDE"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CALN", "CALNHIDE"],
      ["MENU", "MENUHIDE"],
    ];

    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) {}

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix",
    );

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        dispatch({
          type: item[1],
        });
      }
    });
  };

  window.oncontextmenu = (e) => {
    afterMath(e);
    e.preventDefault();
    // dispatch({ type: 'GARBAGE'});
    var data = {
      top: e.clientY,
      left: e.clientX,
    };

    if (e.target.dataset.menu != null) {
      data.menu = e.target.dataset.menu;
      data.attr = e.target.attributes;
      data.dataset = e.target.dataset;
      dispatch({
        type: "MENUSHOW",
        payload: data,
      });
    }
  };

  window.onclick = afterMath;

  window.onload = (e) => {
    dispatch({ type: "WALLBOOTED" });
  };

  useEffect(() => {
    if (!window.onstart) {
      loadSettings();
      window.onstart = setTimeout(() => {
        // console.log("prematurely loading ( ﾉ ﾟｰﾟ)ﾉ");
        dispatch({ type: "WALLBOOTED" });
      }, 5000);
    }
  });

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {!wall.booted ? <BootScreen dir={wall.dir} /> : null}
        {wall.locked ? <LockScreen dir={wall.dir} /> : null}
        <div className="appwrap">
          <Background />
          <div className="desktop" data-menu="desk">
            <DesktopApp />
            {Object.keys(Applications).map((key, idx) => {
              var WinApp = Applications[key];
              return <WinApp key={idx} />;
            })}
            {Object.keys(apps)
              .filter((x) => x != "hz")
              .map((key) => apps[key])
              .map((app, i) => {
                if (app.pwa) {
                  var WinApp = Drafts[app.data.type];
                  return <WinApp key={i} icon={app.icon} {...app.data} />;
                }
              })}
            <StartMenu />
            <BandPane />
            <SidePane />
            <WidPane />
            <CalnWid />
            <StickyNote
              content="<h1>MSNVista Roadmap</h1>

    <h2>2024 Q4: Mainnet Launch & Token Listing</h2>
    <ul>
        <li><strong>Mainnet Launch:</strong> Launch MSNVista on the mainnet with core features like token minting, transfers, and chat. Ensure smart contracts are fully functional.</li>
        <li><strong>Token Listing on EtherVista Dex:</strong> List MSNVista tokens and set up liquidity pools to incentivize early users.</li>
        <li><strong>Community Engagement & Marketing:</strong> Launch marketing campaigns and provide incentives like airdrops.</li>
        <li><strong>Security Audits:</strong> Conduct security audits and deploy fixes.</li>
    </ul>

    <h2>2025 Q1: Alpha Release & Feature Expansion</h2>
    <ul>
        <li><strong>Feature Expansion:</strong> Add staking and governance features for community involvement.</li>
        <li><strong>Alpha Release:</strong> Release alpha version for early testing and feedback.</li>
        <li><strong>Community Growth:</strong> Partner with influencers and offer staking rewards.</li>
    </ul>

    <h2>2025 Q2: Beta Release & Ecosystem Growth</h2>
    <ul>
        <li><strong>Beta Release:</strong> Launch the beta version with token swaps and advanced features.</li>
        <li><strong>Partnership Development:</strong> Expand partnerships with other blockchain projects and explore cross-chain integration.</li>
        <li><strong>Community Governance:</strong> Roll out governance for platform upgrades and community decisions.</li>
    </ul>

    <h2>2025 Q3: Growth & Onboarding</h2>
    <ul>
        <li><strong>User Onboarding:</strong> Scale user onboarding with tutorials and token incentives.</li>
        <li><strong>Feature Expansion:</strong> Enhance features like NFT marketplace and staking options.</li>
    </ul>

    <h2>2025 Q4: Maturity & Future Planning</h2>
    <ul>
        <li><strong>Security & Scaling:</strong> Conduct regular audits and explore cross-chain integration.</li>
        <li><strong>Future Roadmap:</strong> Plan future developments based on community feedback and platform success.</li>
    </ul>"
              width="600px"
              height="600px"
              top="50px"
              left="100px"
              color="#caf0f8"
            />
          </div>
          <Taskbar />
          <ActMenu />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
