import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { Row, Col, Collapse, Typography, Avatar } from 'antd';
import millify from 'millify';
import { useGetExchangesQuery } from '../services/cryptoApi';


const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
    
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;


    if(isFetching) return "Loading...";

    return (
        <>
        <Row className="exchange-titles">
            {/* maybe use typography with some level for subtitles */}
            {/* I may also want to asign some span/width using the antd grid system */}
            <Col span={6} className="exchanges-subtitle">Exchanges</Col>
            <Col span={6} className="24h-volume-subtitle">24h Trade Volume</Col>
            <Col span={6} className="markets-subtitle">Markets</Col>
            <Col span={6} className="change-subtitle">Change</Col>
        </Row>
        <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '&#128531 OOPS! no description available')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>




        </>
    )
}

export default Exchanges
