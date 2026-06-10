import React from 'react'
import { useDashoard } from '../../no3_store/hooks/useDashboard';
import { Card, Col, Row, Statistic, Typography } from 'antd'
import {
    DollarOutlined,
    ShoppingCartOutlined,
    InboxOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const { Title } = Typography

const kpiConfig = [
    {
        key: 'totalSalesAmount',
        title: '총 매출액',
        suffix: '원',
        icon: <DollarOutlined />,
        color: '#1677ff',
        bg: '#e6f4ff',
    },
    {
        key: 'totalQuantity',
        title: '총 판매수량',
        suffix: '건',
        icon: <InboxOutlined />,
        color: '#52c41a',
        bg: '#f6ffed',
    },
    {
        key: 'totalOrderCount',
        title: '총 주문건수',
        suffix: '건',
        icon: <ShoppingCartOutlined />,
        color: '#fa8c16',
        bg: '#fff7e6',
    },
    {
        key: 'customerCount',
        title: '고객 수',
        suffix: '명',
        icon: <UserOutlined />,
        color: '#722ed1',
        bg: '#f9f0ff',
    },
    {
        key: 'productCount',
        title: '상품 수',
        suffix: '개',
        icon: <AppstoreOutlined />,
        color: '#eb2f96',
        bg: '#fff0f6',
    },
]

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
        legend: {
            position: "top"
        }
    }
}

const Dashboard = () => {
    const { kpi, userRanking, productRanking } = useDashoard();

    const userChartData = {
        labels: userRanking.map(item => item.name),
        datasets: [
            {
                label: "구매 건수",
                data: userRanking.map(item => item.count),
                backgroundColor: '#1677ff',
                borderRadius: 4,
            }
        ]
    }

    const productChartData = {
        labels: productRanking.map(item => item.name),
        datasets: [
            {
                label: "판매 수량",
                data: productRanking.map(item => item.quantity),
                backgroundColor: '#52c41a',
                borderRadius: 4,
            }
        ]
    }

    return (
        <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>

            {/* 페이지 타이틀 */}
            <Title level={4} style={{ marginBottom: 24 }}>대시보드</Title>

            {/* KPI 카드 */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {kpiConfig.map(({ key, title, suffix, icon, color, bg }) => (
                    <Col key={key} xs={24} sm={12} md={8} lg={8} xl={4}>
                        <Card
                            style={{ borderRadius: 8 }}
                            styles={{ body: { padding: 20 } }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 8,
                                    background: bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    color: color,
                                    flexShrink: 0,
                                }}>
                                    {icon}
                                </div>
                                <Statistic
                                    title={title}
                                    value={kpi[key]}
                                    suffix={suffix}
                                    valueStyle={{ fontSize: 20, fontWeight: 600, color: '#1d1d1d' }}
                                />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 차트 */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        title="고객 구매 랭킹 TOP 10"
                        style={{ borderRadius: 8 }}
                    >
                        <div style={{ height: 320 }}>
                            <Bar data={userChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title="상품 판매 랭킹 TOP 10"
                        style={{ borderRadius: 8 }}
                    >
                        <div style={{ height: 320 }}>
                            <Bar data={productChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default Dashboard
