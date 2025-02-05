import { SortableContext } from '@dnd-kit/sortable'
import { Equal } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import Col from './Col'
import Section from './Section'
import { ICol } from '../types/col.type'

interface ColumnLayoutProps {
  columns: ICol[]
}

const ResizeHandle = () => (
  <PanelResizeHandle className='relative mx-2 flex w-1 items-center justify-center transition-colors hover:bg-gray-300'>
    <div className='h-full w-[1px] bg-slate-600'></div>
    <div className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 rounded-md bg-slate-200 py-1'>
      <Equal className='h-8 w-4 rotate-90' height={40} />
    </div>
  </PanelResizeHandle>
)

const ColumnLayout = ({ columns }: ColumnLayoutProps) => {
  return (
    <SortableContext items={columns.map((c) => c.id)}>
      <PanelGroup direction='horizontal' className='w-full'>
        {columns.map((col, index) => (
          <>
            <Panel
              key={col.id}
              defaultSize={col.style ? col.style : 100 / columns.length}
              className='min-w-max'
            >
              <Col id={col.id} className={`w-[${col.style}]`}>
                <SortableContext items={col.listSections.map((s) => s.id)}>
                  <div className='flex flex-col items-start gap-y-2'>
                    {col.listSections.map((section) => (
                      <Section
                        id={section.id}
                        key={section.id}
                        sectionName={section.sectionName}
                      />
                    ))}
                  </div>
                </SortableContext>
              </Col>
            </Panel>
            {index < columns.length - 1 && <ResizeHandle />}
          </>
        ))}
      </PanelGroup>
    </SortableContext>
  )
}

export default ColumnLayout
