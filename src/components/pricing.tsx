"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { tabledata } from "@/lib/data/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Pricing = () => {
  const [accountType, setAccountType] = useState<string | null>(null)
  const [evaluationPhase, setEvaluationPhase] = useState<string | null>(null)
  const [accountBalance, setAccountBalance] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setAccountType("Standard")
    setEvaluationPhase("3-Step")
    setAccountBalance(25000)
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevents mismatched HTML during hydration
  }

  const accountTypes = ["Standard", "Aggressive"]
  const evaluationPhases = ["3-Step", "2-Step", "1-Step"]
  const accountBalances = [2500, 5000, 10000, 25000, 50000, 100000]

  return (<section id="Pricing" className="w-full py-16 px-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center">Pricing</h2>
      <p className="text-purple-500 mt-2 text-center mb-6">
        <span className="underline">Explore our range of funding account options.</span>
      </p>
      {/* Account Type Selection */}
      <motion.div className="flex gap-4 mb-4">
        {accountTypes.map((type) => (
          <motion.button
            key={type}
            onClick={() => setAccountType(type)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              accountType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {type}
          </motion.button>
        ))}
      </motion.div>

      {/* Evaluation Phases Selection */}
      <motion.div className="flex gap-4 mb-4">
        {evaluationPhases.map((phase) => (
          <motion.button
            key={phase}
            onClick={() => setEvaluationPhase(phase)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              evaluationPhase === phase ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {phase}
          </motion.button>
        ))}
      </motion.div>

      {/* Account Balance Selection */}
      <motion.div className="flex gap-4 mb-6 flex-wrap">
        {accountBalances.map((balance) => (
          <motion.button
            key={balance}
            onClick={() => setAccountBalance(balance)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              accountBalance === balance ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            ${balance.toLocaleString()}
          </motion.button>
        ))}
      </motion.div>

      {/* Pricing Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-x-auto"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableHead className="w-[150px] text-gray-900 dark:text-gray-100">Metric</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Phase 1</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Phase 2</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Phase 3</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Funded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabledata.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{row.metric}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{row.phase1}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{row.phase2}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{row.phase3}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{row.funded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
    </section>
  )
}

export default Pricing

