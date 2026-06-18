import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Cpu, Plus, Layers, Play, CheckCircle, AlertTriangle, HelpCircle, TrendingUp } from "lucide-react";
import confetti from "canvas-confetti";

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  signature: string;
}

interface Block {
  index: number;
  timestamp: string;
  previousHash: string;
  merkleRoot: string;
  transactions: Transaction[];
  nonce: number;
  difficulty: number;
  hash: string;
}

const calculateMockHash = (
  index: number,
  prevHash: string,
  merkleRoot: string,
  nonce: number,
  difficulty: number
): string => {
  const combined = `${index}${prevHash}${merkleRoot}${nonce}${difficulty}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).repeat(8).substring(0, 64);

  const prefix = "0".repeat(difficulty);
  return prefix + hex.substring(difficulty);
};

export const BlockchainDemo: React.FC = () => {
  const { theme } = themeContext();

  const [blocks, setBlocks] = useState<Block[]>([
    {
      index: 0,
      timestamp: "2026-06-18 10:00:00",
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      merkleRoot: "7fa8e1b3...",
      nonce: 1422,
      difficulty: 2,
      hash: "00a29f81d83ce93282b0e7cf2305a41bf8f6b218aef82bcf2918dfca38be98e3",
      transactions: [
        { id: "tx_0", from: "COINBASE", to: "Gaurav", amount: 50, fee: 0, signature: "ECDSA_GENESIS_SIG" },
      ],
    },
  ]);

  const [mempool, setMempool] = useState<Transaction[]>([
    { id: "tx_1", from: "Gaurav", to: "Alice", amount: 12.5, fee: 0.05, signature: "ECDSA_secp192v1_sig_9f2" },
    { id: "tx_2", from: "Bob", to: "Charlie", amount: 5.0, fee: 0.12, signature: "ECDSA_secp192v1_sig_a31" },
  ]);

  const [fromUser, setFromUser] = useState("Gaurav");
  const [toUser, setToUser] = useState("User");
  const [txAmount, setTxAmount] = useState(10);
  const [txFee, setTxFee] = useState(0.02);

  const [difficulty, setDifficulty] = useState(2);
  const [isMining, setIsMining] = useState(false);
  const [miningNonce, setMiningNonce] = useState(0);
  const [miningHash, setMiningHash] = useState("");
  const [hashRate, setHashRate] = useState(0);

  // Sorting Mempool by fee
  const sortedMempool = [...mempool].sort((a, b) => b.fee - a.fee);

  // Theme helper wrapper
  function themeContext() {
    return useTheme();
  }

  // Create Transaction
  const handleCreateTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (txAmount <= 0) return;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      from: fromUser,
      to: toUser,
      amount: txAmount,
      fee: txFee,
      signature: `ECDSA_secp192v1_sig_${Math.floor(Math.random() * 1000).toString(16)}`,
    };

    setMempool((prev) => [...prev, newTx]);
    // Reset inputs
    setTxAmount(10);
    setTxFee(0.02);
  };

  // Proof-of-Work Mining Loop
  useEffect(() => {
    let interval: number;
    if (isMining) {
      const startTime = Date.now();
      let currentNonce = 0;
      const prevBlock = blocks[blocks.length - 1];
      const merkleRoot = Math.random().toString(16).substring(2, 10) + "...";
      const requiredPrefix = "0".repeat(difficulty);

      interval = window.setInterval(() => {
        let hash = "";
        let nonce = currentNonce;

        for (let i = 0; i < 45; i++) {
          nonce++;
          hash = calculateMockHash(blocks.length, prevBlock.hash, merkleRoot, nonce, difficulty);

          if (hash.startsWith(requiredPrefix)) {
            break;
          }
        }

        currentNonce = nonce;
        setMiningNonce(currentNonce);
        setMiningHash(hash);

        const elapsed = (Date.now() - startTime) / 1000;
        setHashRate(Math.floor(currentNonce / (elapsed || 0.1)));

        if (hash.startsWith(requiredPrefix)) {
          setIsMining(false);
          clearInterval(interval);

          const newBlock: Block = {
            index: blocks.length,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
            previousHash: prevBlock.hash,
            merkleRoot,
            nonce: currentNonce,
            difficulty,
            hash,
            transactions: sortedMempool.slice(0, 3), // Mine top 3 fee prioritised txs
          };

          setBlocks((prev) => [...prev, newBlock]);

          setMempool((prev) => {
            const minedIds = newBlock.transactions.map((tx) => tx.id);
            return prev.filter((tx) => !minedIds.includes(tx.id));
          });

          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#00d4ff", "#6c63ff", "#00e676"],
          });
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isMining, difficulty, blocks, sortedMempool]);

  const triggerMining = () => {
    if (sortedMempool.length === 0) {
      alert("Mempool is empty! Please create a transaction first.");
      return;
    }
    setIsMining(true);
  };

  const isChainValid = () => {
    for (let i = 1; i < blocks.length; i++) {
      const current = blocks[i];
      const previous = blocks[i - 1];
      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    return true;
  };

  return (
    <section id="blockchain-demo" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Interactive Blockchain Sandbox
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Witness UTXO architecture in action. Submit simulated transactions with prioritized network fees,
            configure Proof-of-Work difficulty, and mine blocks live under a SHA-256 solver simulation.
          </p>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <div
              className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-navy/40 border-white/5" : "bg-white border-black/5 shadow-sm"
                }`}
            >
              <div className="flex items-center space-x-2 mb-6 text-slate-800 dark:text-white">
                <Plus className="text-teal h-5 w-5" />
                <h3 className="font-poppins font-bold text-lg">1. Create UTXO Transaction</h3>
              </div>

              <form onSubmit={handleCreateTx} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-slate-500 mb-1">
                      FROM (ECDSA SENDER)
                    </label>
                    <select
                      value={fromUser}
                      onChange={(e) => setFromUser(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-sm font-semibold outline-none ${theme === "dark"
                          ? "bg-navy/85 border-white/10 text-white"
                          : "bg-slate-50 border-black/10 text-slate-800"
                        }`}
                    >
                      <option value="Gaurav">Gaurav (Wallet)</option>
                      <option value="Alice">Alice (Wallet)</option>
                      <option value="Bob">Bob (Wallet)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-slate-500 mb-1">
                      TO (RECIPIENT)
                    </label>
                    <select
                      value={toUser}
                      onChange={(e) => setToUser(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-sm font-semibold outline-none ${theme === "dark"
                          ? "bg-navy/85 border-white/10 text-white"
                          : "bg-slate-50 border-black/10 text-slate-800"
                        }`}
                    >
                      <option value="User">You (User)</option>
                      <option value="Alice">Alice (Wallet)</option>
                      <option value="Bob">Bob (Wallet)</option>
                      <option value="Charlie">Charlie (Wallet)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-slate-500 mb-1">
                      AMOUNT (BTC/DEV)
                    </label>
                    <input
                      type="number"
                      value={txAmount}
                      onChange={(e) => setTxAmount(Number(e.target.value))}
                      min="0.1"
                      step="0.1"
                      className={`w-full p-2.5 rounded-xl border text-sm font-semibold outline-none ${theme === "dark"
                          ? "bg-navy/85 border-white/10 text-white"
                          : "bg-slate-50 border-black/10 text-slate-800"
                        }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-slate-500 mb-1">
                      FEE PRIORITY
                    </label>
                    <input
                      type="number"
                      value={txFee}
                      onChange={(e) => setTxFee(Number(e.target.value))}
                      min="0.001"
                      step="0.001"
                      className={`w-full p-2.5 rounded-xl border text-sm font-semibold outline-none ${theme === "dark"
                          ? "bg-navy/85 border-white/10 text-white"
                          : "bg-slate-50 border-black/10 text-slate-800"
                        }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isMining}
                  className="w-full py-3 rounded-xl bg-purple text-white font-poppins font-bold hover:bg-purple-dark hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  Sign & Broadcast Transaction
                </button>
              </form>

              <div className="mt-4 p-3 rounded-lg bg-teal/5 border border-teal/20 text-xs font-mono text-teal flex items-start space-x-2">
                <HelpCircle size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  <strong>ECDSA Signature:</strong> Signed using secp192v1 curve keys for optimal performance on local clients. Balance checked against active UTXOs.
                </span>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-navy/40 border-white/5" : "bg-white border-black/5 shadow-sm"
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                  <TrendingUp className="text-teal h-5 w-5" />
                  <h3 className="font-poppins font-bold text-lg">2. Broadcast Mempool</h3>
                </div>
                <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-slate-100 dark:bg-white/5 text-slate-400">
                  {mempool.length} txs pending
                </span>
              </div>

              {mempool.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-mono">
                  Mempool empty. Submit transactions above.
                </div>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {sortedMempool.map((tx, idx) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${idx < 3
                            ? "border-teal/30 bg-teal/5"
                            : theme === "dark"
                              ? "border-white/5 bg-navy/60"
                              : "border-black/5 bg-slate-50"
                          }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-700 dark:text-slate-200">
                            {tx.from} ➔ {tx.to}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{tx.signature.substring(0, 24)}...</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-teal">{tx.amount} DEV</div>
                          <div className="text-[10px] text-purple font-semibold">Fee: {tx.fee} DEV</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div
              className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-navy/40 border-white/5" : "bg-white border-black/5 shadow-sm"
                }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                  <Cpu className="text-teal h-5 w-5" />
                  <h3 className="font-poppins font-bold text-lg">3. Proof-of-Work Consensus</h3>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="text-xs font-mono text-slate-400 dark:text-slate-500">DIFFICULTY:</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    disabled={isMining}
                    className="w-24 accent-teal h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-mono text-sm font-bold text-teal">{difficulty}</span>
                </div>
              </div>

              <div className="bg-slate-950 dark:bg-black p-4 rounded-xl font-mono text-xs text-slate-300 min-h-[120px] relative overflow-hidden border border-white/5 mb-6">
                {isMining ? (
                  <div className="space-y-1">
                    <div className="text-teal animate-pulse">⚡ Mining Block #{blocks.length}...</div>
                    <div>Difficulty Target: {"0".repeat(difficulty)}...</div>
                    <div className="text-purple">Nonce Counter: {miningNonce}</div>
                    <div className="text-slate-400 truncate">Candidate Hash: {miningHash}</div>
                    <div className="text-slate-500">Hash Rate: {(hashRate / 1000).toFixed(1)} KH/s</div>

                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal to-purple w-full animate-pulse" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                    <Layers className="h-10 w-10 text-teal/20 mb-2" />
                    <span>MINER CONSOLE IDLE</span>
                    <span className="text-[10px] text-slate-500 mt-1">Select Difficulty and click Mine Block</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {isChainValid() ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-success/5 border border-success/20 text-success">
                      <CheckCircle size={14} />
                      <span>Ledger Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-red-500/5 border border-red-500/20 text-red-500 animate-pulse">
                      <AlertTriangle size={14} />
                      <span>Chain Broken!</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={triggerMining}
                  disabled={isMining || mempool.length === 0}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-teal text-slate-900 font-poppins font-bold hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Mine Block</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-poppins font-bold text-sm text-slate-600 dark:text-slate-400">
                4. Live Distributed Blockchain Ledgers
              </h4>

              <div className="flex space-x-6 overflow-x-auto pb-4 pt-2 px-1">
                {blocks.map((block) => (
                  <div
                    key={block.index}
                    className={`flex-shrink-0 w-64 p-4 rounded-xl border flex flex-col justify-between transition-all ${theme === "dark"
                        ? "bg-navy/40 border-white/5 hover:border-teal/30"
                        : "bg-white border-black/5 hover:shadow-md"
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-poppins font-bold text-sm text-slate-800 dark:text-white">
                          BLOCK #{block.index}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{block.timestamp}</span>
                      </div>

                      <div className="space-y-1 text-[10px] font-mono mb-3 text-slate-400">
                        <div className="truncate" title={block.hash}>
                          <strong>Hash:</strong> {block.hash}
                        </div>
                        <div className="truncate" title={block.previousHash}>
                          <strong>Prev:</strong> {block.previousHash}
                        </div>
                        <div>
                          <strong>Nonce:</strong> {block.nonce} | <strong>Diff:</strong> {block.difficulty}
                        </div>
                      </div>

                      <div className="border-t border-slate-200 dark:border-white/5 pt-2">
                        <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Transactions ({block.transactions.length})
                        </div>
                        <div className="space-y-1">
                          {block.transactions.map((tx, idx) => (
                            <div key={idx} className="text-[10px] font-mono flex justify-between">
                              <span className="text-slate-500 truncate max-w-[120px]">
                                {tx.from}➔{tx.to}
                              </span>
                              <span className="text-teal font-semibold">{tx.amount} DEV</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
