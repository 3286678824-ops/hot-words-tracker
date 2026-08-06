import { useDashboardData } from '../hooks/useDashboardData'
import { WordCloud } from '../components/dashboard/WordCloud'
import { FrequencyBarChart } from '../components/dashboard/FrequencyBarChart'
import { SummaryCard } from '../components/dashboard/SummaryCard'
import './pages.css'

export function DashboardPage() {
  const { wordCloudData, topWords, totalCount, todayCount, loading } = useDashboardData()

  if (loading) {
    return <div className="page-loading">加载中...</div>
  }

  if (totalCount === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard__summary">
          <SummaryCard label="热词总数" count={0} />
          <SummaryCard label="今日新增" count={0} />
        </div>
        <div className="dashboard__empty">
          <p>还没有热词记录</p>
          <p className="dashboard__empty-hint">点击"添加热词"开始记录吧</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard__summary">
        <SummaryCard label="热词总数" count={totalCount} />
        <SummaryCard label="今日新增" count={todayCount} />
      </div>

      <section className="dashboard__section">
        <h2 className="section-title">词云</h2>
        {wordCloudData.length > 0 ? (
          <WordCloud data={wordCloudData} />
        ) : (
          <div className="chart-empty">添加更多热词后显示词云</div>
        )}
      </section>

      <section className="dashboard__section">
        <h2 className="section-title">热词排行</h2>
        {topWords.length > 0 ? (
          <FrequencyBarChart data={topWords} />
        ) : (
          <div className="chart-empty">添加更多热词后显示排行</div>
        )}
      </section>
    </div>
  )
}
