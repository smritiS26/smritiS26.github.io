import React, { useState } from 'react';
import { Play, CheckCircle2, RotateCcw, Copy, Check } from 'lucide-react';

interface CodeSnippet {
  id: string;
  label: string;
  file: string;
  language: string;
  code: string;
  execTime: string;
  testCount: string;
  logSteps: string[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'selenium',
    label: 'Selenium POM',
    file: 'CheckoutFlowE2ETest.java',
    language: 'java',
    execTime: '1.42s',
    testCount: '1 passed',
    code: `// Suite: CheckoutFlowE2ETest.java
@Test(groups = {"smoke", "regression"})
public void verifyEnterpriseOrderPlacement() {
    LoginPage loginPage = new LoginPage(driver);
    OrderConfirmationPage order =
        loginPage.authenticateUser(creds)
            .navigateToCatalog()
            .addItemToCart(SKU_ENTERPRISE)
            .processCheckoutWithSFCC();
    assertTrue(order.isTransactionCommitted(),
    "Order ID verified");
}`,
    logSteps: [
      '[INFO] Initializing ChromeDriver headless instance (v124.0.6367.60)',
      '[INFO] Navigating to https://storefront.enterprise-commerce.io/login',
      '[INFO] Auth handshake: credentials verified via JWT SSO gate',
      '[INFO] SKU_ENTERPRISE matched in inventory cache: Stock = 42 units',
      '[INFO] Triggering SFCC checkout orchestrator with 3D-Secure mock token',
      '[PASS] OrderConfirmation.isTransactionCommitted() == true [TX: #SFCC-98421]',
      '[SUCCESS] Suite execution complete: 1/1 tests passed without retries'
    ]
  },
  {
    id: 'appium',
    label: 'Appium Cloud',
    file: 'MobileCheckoutSanity.java',
    language: 'java',
    execTime: '2.84s',
    testCount: '1 passed',
    code: `// Suite: MobileCheckoutSanity.java
@Test(groups = {"mobile", "lambdaTest"})
public void testBiometricAuthAndCheckout() {
    MobileDriver driver = LambdaTestGrid.acquire("Pixel_8_Android_14");
    CatalogScreen catalog = new LoginScreen(driver)
        .passBiometricPrompt()
        .selectCategory("Industrial Hardware");
    CartScreen cart = catalog.addFirstItemToCart();
    assertTrue(cart.isCartSyncedWithCloud(), "Cart state reconciled");
}`,
    logSteps: [
      '[INFO] Connected to LambdaTest Cloud Hub: Device Google Pixel 8 (Android 14)',
      '[INFO] Appium UIAutomator2 driver session initiated (Session #LT-78923)',
      '[INFO] Biometric fingerprint authentication prompt intercepted & passed',
      '[INFO] Category "Industrial Hardware" queried with 14ms touch latency',
      '[INFO] Item SKU-HARDWARE-01 added to cart; sync websocket triggered',
      '[PASS] Cart state confirmed synchronized with upstream redis cluster',
      '[SUCCESS] Session teardown: 0 frame drops, 0 ANR events logged'
    ]
  },
  {
    id: 'rest-assured',
    label: 'REST Assured',
    file: 'EnterpriseInventoryAPITest.java',
    language: 'java',
    execTime: '312ms',
    testCount: '1 passed',
    code: `// Suite: EnterpriseInventoryAPITest.java
@Test(groups = {"api", "contracts"})
public void validateERPInventorySyncEndpoint() {
    given()
        .header("Authorization", "Bearer " + jwtToken)
        .contentType(ContentType.JSON)
    .when()
        .get("/api/v2/erp/inventory/SKU_ENTERPRISE")
    .then()
        .statusCode(200)
        .body("status", equalTo("IN_STOCK"))
        .body("latency_ms", lessThan(380));
}`,
    logSteps: [
      '[INFO] Preparing HTTP GET /api/v2/erp/inventory/SKU_ENTERPRISE',
      '[INFO] Injecting HMAC Bearer authorization header with RS256 signature',
      '[INFO] Response received in 184ms (HTTP 200 OK)',
      '[PASS] Contract Assertion: JSON body "status" matches "IN_STOCK"',
      '[PASS] SLA Assertion: response latency 184ms < 380ms threshold',
      '[PASS] Schema Validation: JSON Schema ERP_Inventory_v2.json matched',
      '[SUCCESS] REST Assured validation: All 3 assertions satisfied'
    ]
  },
  {
    id: 'llm-guardrails',
    label: 'LLM Guardrails',
    file: 'AgenticGuardrailEvaluation.py',
    language: 'python',
    execTime: '1.18s',
    testCount: '1 passed',
    code: `# Suite: AgenticGuardrailEvaluation.py
@pytest.mark.ai_safety
def test_hallucination_and_grounding_thresholds():
    eval_pipeline = LLMEvaluator(context=enterprise_it_kb)
    result = eval_pipeline.evaluate_response(
        prompt="Execute critical failover for ERP cluster",
        response=agent_response
    )
    assert result.grounding_score >= 0.994
    assert result.hallucination_detected is False`,
    logSteps: [
      '[INFO] Bootstrapping GenAI Evaluator with ITSM Knowledge Graph embeddings',
      '[INFO] Analyzing candidate agent response for prompt injection vectors',
      '[INFO] Semantic fidelity check: cosine similarity = 0.997 against ground truth',
      '[PASS] Guardrail: Hallucination rate = 0.00% across 5 stochastic runs',
      '[PASS] Guardrail: Least-privilege role boundaries verified (L1 only)',
      '[SUCCESS] Model safety & grounding assertions verified [Score: 99.4%]'
    ]
  }
];

export const InteractiveTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('selenium');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showLogs, setShowLogs] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = SNIPPETS.find(s => s.id === activeTab) || SNIPPETS[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setShowLogs(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-[#090e1c] border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1321] border-b border-cyan-500/15">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 text-slate-400 font-mono text-[11px] tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            test-runner // pipeline-status: <span className="text-emerald-400 font-semibold">PASSED</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-[11px] hidden sm:inline">
            EXEC: <span className="text-cyan-400">248FPS</span>
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors py-0.5 px-2 rounded bg-slate-800/60 border border-slate-700/60"
            title="Copy code snippet"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-cyan-500/15 bg-[#0b101f] overflow-x-auto scrollbar-none px-2 pt-1.5 gap-1">
        {SNIPPETS.map((snippet) => {
          const isActive = snippet.id === activeTab;
          return (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveTab(snippet.id);
                setShowLogs(false);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#090e1c] text-cyan-300 border-t-2 border-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
              {snippet.label}
            </button>
          );
        })}

        <div className="ml-auto pl-2 py-1 pr-1 flex items-center gap-2">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 rounded cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <RotateCcw className="w-3 h-3 animate-spin text-emerald-400" />
            ) : (
              <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Suite'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 bg-[#090e1c] text-slate-300 leading-relaxed overflow-x-auto min-h-[220px]">
        {showLogs ? (
          <div className="space-y-1.5 py-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live Pipeline Execution Log
              </span>
              <button
                onClick={() => setShowLogs(false)}
                className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                View Source Code
              </button>
            </div>
            {currentSnippet.logSteps.map((step, idx) => (
              <div
                key={idx}
                className={`text-[12px] font-mono leading-5 transition-opacity ${
                  step.includes('[PASS]') || step.includes('[SUCCESS]')
                    ? 'text-emerald-400 font-medium'
                    : step.includes('[INFO]')
                    ? 'text-slate-300'
                    : 'text-cyan-300'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        ) : (
          <pre className="font-mono text-[12.5px] leading-5 text-slate-200 selection:bg-cyan-900/60 selection:text-white">
            <code>
              {currentSnippet.code.split('\n').map((line, index) => {
                // Syntax colorizing highlights
                let formattedLine = line;
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
                const isAnnotation = line.trim().startsWith('@');

                if (isComment) {
                  return (
                    <div key={index} className="text-slate-500 italic">
                      {line}
                    </div>
                  );
                }

                if (isAnnotation) {
                  return (
                    <div key={index} className="text-emerald-400 font-medium">
                      {line}
                    </div>
                  );
                }

                return (
                  <div key={index} className="text-slate-200">
                    {/* Render with syntax token emphasis */}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(
                            /\b(public|void|new|return|def|assert|import)\b/g,
                            '<span class="text-sky-400 font-semibold">$1</span>'
                          )
                          .replace(
                            /\b(LoginPage|OrderConfirmationPage|OrderConfirmation|MobileDriver|CatalogScreen|CartScreen|LambdaTestGrid|LLMEvaluator)\b/g,
                            '<span class="text-cyan-300">$1</span>'
                          )
                          .replace(
                            /(".*?")/g,
                            '<span class="text-emerald-300">$1</span>'
                          )
                          .replace(
                            /\b(assertTrue|authenticateUser|navigateToCatalog|addItemToCart|processCheckoutWithSFCC|isTransactionCommitted|acquire|passBiometricPrompt|selectCategory|addFirstItemToCart|isCartSyncedWithCloud|given|header|contentType|when|get|then|statusCode|body|equalTo|lessThan|evaluate_response)\b/g,
                            '<span class="text-blue-300">$1</span>'
                          )
                      }}
                    />
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-[#0d1527] border-t border-cyan-500/15 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Continuous Integration: Maven Surefire 100% Passed</span>
        </div>
        <div className="text-slate-500">JVM 17.0.8</div>
      </div>
    </div>
  );
};
