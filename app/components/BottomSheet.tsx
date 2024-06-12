import React, { useState } from "react";

const BottomSheet = () => {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(true);
  const [bottomSheetHeight, setBottomSheetHeight] = useState<number>(200);

  const handleStart = () => {
    setBottomSheetHeight(100);
    setShowBottomSheet(true);

    document.documentElement.style.overflow = "hidden";
  };

  const detectLeftMouse = (e: MouseEvent | undefined) => {
    if (!e) return false;

    if ("buttons" in e) {
      return (e as MouseEvent).buttons === 1;
    }

    let button = (e as MouseEvent).which || (e as MouseEvent).button;
    return button === 1;
  };

  const handleClose = () => {
    setShowBottomSheet(false);
    document.documentElement.style.overflow = "none";
  };

  const dragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!detectLeftMouse(e.nativeEvent)) return;

    let startY = e.clientY;
    let newHeight: number;

    const dragMove = (e: PointerEvent) => {
      const delta = startY - e.clientY;
      newHeight = bottomSheetHeight + (delta / window.innerHeight) * 100;
      setBottomSheetHeight(newHeight);
    };
    document.onpointermove = dragMove;

    const dragEnd = () => {
      document.onpointermove = null;
      document.onpointerup = null;

      if (newHeight && newHeight < 20) {
        handleClose();
      } else if (newHeight && newHeight < 80) {
        setBottomSheetHeight(50);
      } else {
        setBottomSheetHeight(100);
      }
    };
    document.onpointerup = dragEnd;
  };

  return (
    <div className={`bottom_sheet_container ${showBottomSheet ? "show" : ""}`}>
      <div
        className="bottom_sheet_content"
        style={{ height: `${bottomSheetHeight}px` }}
      >
        <div className="bottom_sheet_header">
          <div className="drag_icon" onPointerDown={dragStart}>
            <span>...</span>
          </div>
        </div>
        <h3>Hello</h3>
      </div>
    </div>
  );
};

export default BottomSheet;
