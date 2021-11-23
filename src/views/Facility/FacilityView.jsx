import React, { useEffect, useState } from 'react'
import { PageHeader, Row, Button, Col } from 'antd'
import { useFacility } from '../../hooks/Facilities';
import { useParams } from 'react-router';
import FacilityMap from '../../components/facility/FacilityMap';
import { CurrentAreasList } from "../../components/facilities";

const FacilityView = () => {
  const colors = ["#FF0000", "#FF00FB", "#1B00FF", "#00E0FF", "#FF9700", "#008C0D", "#FF7400", "#009999", "#6A0AAB"];
  let { idFacility } = useParams();
  const { loading, areas, positions, getPositions } = useFacility(idFacility)
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (areas && areas.length > 0) {
      setNamesList();
    }
  }, [areas])

  const setNamesList = () => {
    let newNames = [];
    areas.map((area, i) => {
      newNames.push({ name: area.name, color: colors[i % colors.length] })
    })
    setNames(newNames)
  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="En vivo"
        subTitle={areas && areas.length > 0 ? areas[0].facilityName : ''}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={getPositions}
        >
          Actualizar
        </Button>
      </Row>
      <Row>
        <Col span={18}>
          <FacilityMap
            loading={loading}
            areas={areas}
            positions={positions}
            sizeX={areas && areas.length > 0 ? areas[0].facilitySizeX : 0}
            sizeY={areas && areas.length > 0 ? areas[0].facilitySizeY : 0}
          />
        </Col>
        <Col span={6} style={{ padding: 10 }}>
          <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <h4>Da click en una persona para ver más detalle.</h4>
            <div style={{ display: 'flex', alignItems: "center" }}>
              <span style={{ height: "15px", width: "15px", backgroundColor: "#31327A", borderRadius: "50%", display: 'inline-block' }}>
              </span>
              <h4 style={{ paddingLeft: 10 }}>Posiciones de personas</h4>
            </div>
          </div>
          <h2>Áreas</h2>
          <CurrentAreasList
            names={names}
          />
        </Col>
      </Row>
    </>
  )
}

export default FacilityView
