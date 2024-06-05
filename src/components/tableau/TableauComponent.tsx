import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import { TableauViz, TableauEventType, Toolbar, DeviceType } from '@tableau/embedding-api';

export interface TableauProps extends ComponentPropsWithoutRef<'div'> {
  src: string;
  toolbar?: Toolbar;
  device?: DeviceType;
  hideTabs?: boolean;
  width?: string;
  onFirstInteractive?: (viz: TableauViz) => void;
  onLoadComplete?: (viz: TableauViz, isLoaded: boolean) => void;
}

export const TableauComponent: React.FC<TableauProps> = ({
  src,
  toolbar = Toolbar.Bottom,
  device = DeviceType.Default,
  hideTabs = false,
  onFirstInteractive,
  onLoadComplete,
  width,
  ...divProps
}) => {
  const vizDivRef = useRef<HTMLDivElement>(null);
  const viz = useRef<TableauViz | null>(null);

  useEffect(() => {
    if (vizDivRef.current && viz.current === null) {
      vizDivRef.current.innerHTML = '';
      vizDivRef.current.style.display = 'none';

      const v = new TableauViz();
      v.disableVersionCheck = true;
      v.src = src;
      v.toolbar = toolbar;
      v.device = device;
      v.style.backgroundColor = 'black';
      v.hideTabs = hideTabs;

      let vizLoaded = false;
      if (width) v.width = width;
      if (onFirstInteractive !== undefined) {
        v.addEventListener(TableauEventType.FirstInteractive, () => onFirstInteractive(v));
      }

      v.addEventListener(TableauEventType.FirstVizSizeKnown, (e) => {
        vizLoaded = true;
        if (onLoadComplete) {
          if (vizDivRef.current) vizDivRef.current.style.display = 'block';
          onLoadComplete(v, true);
        }
      });

      setTimeout(() => {
        if (!vizLoaded) {
          if (onLoadComplete) {
            onLoadComplete(v, false);
          }
        }
      }, 15000);

      vizDivRef.current.appendChild(v as any);
      viz.current = v;
    }
  }, [src, toolbar, device, hideTabs, onFirstInteractive, width]);

  return <div id="tableauViz" ref={vizDivRef} {...divProps}></div>;
};

export default TableauComponent;
