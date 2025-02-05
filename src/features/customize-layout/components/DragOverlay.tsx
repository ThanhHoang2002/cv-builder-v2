import { UniqueIdentifier } from '@dnd-kit/core'

import Col from './Col'
import ColumnLayout from './ColumnLayout'
import Row from './Row'
import Section from './Section'
import { ICol } from '../types/col.type'
import { IRow } from '../types/row.type'
import { ISection } from '../types/section.type'

import { ILayout } from '@/stores/layoutSlider'

interface DragOverlayProps {
  activeId: UniqueIdentifier
  findItem: (
    id: UniqueIdentifier,
    layout: ILayout
  ) => IRow | ICol | ISection | null
  layout: ILayout
}

const DragOverlayComponent = ({
  activeId,
  findItem,
  layout,
}: DragOverlayProps) => {
  const item = findItem(activeId, layout)
  if (!item) {
    return <Section id={activeId} sectionName='Unuse Section' />
  }

  // Render Section
  if ('sectionName' in item && typeof item.sectionName === 'string') {
    return (
      <div style={{ transform: 'scale(1)' }}>
        <Section id={activeId} sectionName={item.sectionName} />
      </div>
    )
  }

  // Render Column
  if ('listSections' in item) {
    return (
      <div
        style={{
          transform: 'scale(0.85) scaleX(0.8)',
          transformOrigin: 'top left',
        }}
      >
        <Col id={activeId}>
          <div className='flex flex-col items-start gap-y-4'>
            {item.listSections.map((section: ISection) => (
              <Section
                key={section.id}
                sectionName={section.sectionName}
                id={section.id}
              />
            ))}
          </div>
        </Col>
      </div>
    )
  }

  // Render Row
  if ('listCols' in item) {
    return (
      <Row id={activeId} onAddCol={() => {}} onRemoveCol={() => {}}>
        <div className='flex flex-row gap-x-4'>
          <ColumnLayout columns={item.listCols} />
        </div>
      </Row>
    )
  }

  return null
}

export default DragOverlayComponent
