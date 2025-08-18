import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Select,
  InputNumber,
  ColorPicker,
  Typography,
  Input,
} from "antd";
import { Bold, Italic, Underline, Search, RotateCcw } from "lucide-react";
import { toggleSection } from "../../store/chartSlice";
import ConfigSection from "./ConfigSection";

/**
 * LEGEND SECTION COMPONENT
 *
 * Component này quản lý toàn bộ cấu hình Legend cho biểu đồ.
 * Legend là thành phần hiển thị chú thích giải thích ý nghĩa của
 * các màu sắc, ký hiệu trong biểu đồ.
 *
 * Props:
 * @param config - Object chứa cấu hình hiện tại của legend
 * @param sectionKey - Key để identify section trong Redux store
 * @param handleUpdateFormatConfig - Function để cập nhật cấu hình
 * @param expandedSections - Object chứa trạng thái mở/đóng của các section
 */

interface LegendSectionProps {
  config: any; // Legend configuration object
  sectionKey: string; // Section identifier for Redux
  handleUpdateFormatConfig: (section: string, key: string, value: any) => void;
  expandedSections: any; // Expanded sections state object
}

const LegendSection: React.FC<LegendSectionProps> = ({
  config,
  sectionKey,
  handleUpdateFormatConfig,
  expandedSections,
}) => {
  const dispatch = useDispatch();

  /**
   * RESET TO DEFAULT FUNCTION
   *
   * Hàm này reset tất cả cài đặt legend về giá trị mặc định:
   * - Position: "Top" - Hiển thị ở phía trên biểu đồ
   * - Font: "Segoe UI" - Font mặc định của Microsoft
   * - FontSize: 8 - Kích thước nhỏ gọn
   * - Bold/Italic/Underline: false - Không có định dạng đặc biệt
   * - Color: "#666666" - Màu xám trung tính
   * - Title: enabled=true, text="Legend" - Hiển thị tiêu đề mặc định
   */
  const resetToDefault = () => {
    handleUpdateFormatConfig(sectionKey, "position", "Top");
    handleUpdateFormatConfig(sectionKey, "font", "Segoe UI");
    handleUpdateFormatConfig(sectionKey, "fontSize", 8);
    handleUpdateFormatConfig(sectionKey, "bold", false);
    handleUpdateFormatConfig(sectionKey, "italic", false);
    handleUpdateFormatConfig(sectionKey, "underline", false);
    handleUpdateFormatConfig(sectionKey, "color", "#666666");
    handleUpdateFormatConfig(sectionKey, "title", {
      enabled: true,
      text: "Legend",
    });
  };

  return (
    <div className="properties-container">
      {/* 
        LEGEND CONFIGURATION MAIN CONTAINER
        
        Container chính chứa tất cả các sub-sections của Legend.
        Sử dụng className "properties-container" để styling nhất quán
        với các sections khác trong ứng dụng.
      */}

      {/* 
        OPTIONS SUB-SECTION
        
        Section này chứa các tùy chọn cơ bản của Legend:
        - Position: Vị trí hiển thị legend trên biểu đồ
        
        Sử dụng ConfigSection component để tạo header có thể thu gọn/mở rộng
        với animation và state management tự động.
      */}
      <ConfigSection
        title="Options" // Tiêu đề hiển thị trên header
        isExpanded={expandedSections.legendOptions} // Trạng thái mở/đóng từ Redux
        onToggle={() => dispatch(toggleSection("legendOptions"))} // Action để toggle state
      >
        <div className="section-content">
          {/* 
            POSITION SELECTOR
            
            Dropdown để chọn vị trí hiển thị legend.
            Các options được thiết kế theo chuẩn Power BI:
            - Top: Phía trên biểu đồ (mặc định)
            - Bottom: Phía dưới biểu đồ
            - Left: Bên trái biểu đồ
            - Right: Bên phải biểu đồ
            - Center right: Giữa bên phải (đặc biệt cho pie chart)
          */}
          <div className="form-group">
            <Typography.Text className="form-label">Position</Typography.Text>
            <Select
              size="small" // Kích thước compact để tiết kiệm không gian
              value={config.position || "Top"} // Giá trị hiện tại, fallback "Top"
              onChange={(value) =>
                handleUpdateFormatConfig(sectionKey, "position", value)
              } // Callback khi user thay đổi selection
              style={{ width: "100%" }} // Chiếm toàn bộ chiều rộng container
              options={[
                { label: "Top", value: "Top" },
                { label: "Bottom", value: "Bottom" },
                { label: "Left", value: "Left" },
                { label: "Right", value: "Right" },
                { label: "Center right", value: "Center right" },
              ]}
            />
          </div>
        </div>
      </ConfigSection>

      {/* 
        TEXT SUB-SECTION
        
        Section này quản lý tất cả thuộc tính định dạng text của Legend:
        1. Font Controls: Font family và font size
        2. Text Format Buttons: Bold, Italic, Underline
        3. Color Picker: Màu sắc text
        
        Được thiết kế theo layout Power BI với các controls sắp xếp logical.
      */}
      <ConfigSection
        title="Text"
        isExpanded={expandedSections.legendText}
        onToggle={() => dispatch(toggleSection("legendText"))}
      >
        <div className="section-content">
          {/* 
            FONT CONTROLS GROUP
            
            Group này chứa 2 controls cạnh nhau:
            1. Font Family Selector (Select dropdown)
            2. Font Size Input (InputNumber)
            
            Layout: flexbox horizontal với width cố định cho mỗi control
          */}
          <div className="form-group">
            <Typography.Text className="form-label">Font</Typography.Text>
            <div className="font-controls">
              {/* 
                FONT FAMILY SELECTOR
                
                Dropdown chọn font family.
                Các font được chọn là những font phổ biến và có sẵn
                trên hầu hết các hệ điều hành:
                - Segoe UI: Font chính của Microsoft, modern và clean
                - Arial: Font sans-serif cổ điển, universal compatibility
                - Times New Roman: Font serif truyền thống cho văn bản formal
                - Calibri: Font mặc định của Microsoft Office
              */}
              <Select
                size="small"
                value={config.font || "Segoe UI"} // Default font
                onChange={(value) =>
                  handleUpdateFormatConfig(sectionKey, "font", value)
                }
                style={{ width: "120px" }} // Fixed width cho consistent layout
              >
                <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                <Select.Option value="Arial">Arial</Select.Option>
                <Select.Option value="Times New Roman">
                  Times New Roman
                </Select.Option>
                <Select.Option value="Calibri">Calibri</Select.Option>
              </Select>

              {/* 
                FONT SIZE INPUT
                
                InputNumber cho phép user nhập trực tiếp hoặc dùng spinner.
                Constraints:
                - Min: 8px (đảm bảo text đọc được)
                - Max: 72px (tránh text quá lớn)
                - Default: 10px (size phù hợp cho legend)
              */}
              <InputNumber
                size="small"
                value={config.fontSize || 10} // Default size
                onChange={(value) =>
                  handleUpdateFormatConfig(sectionKey, "fontSize", value)
                }
                style={{ width: "60px" }} // Compact width vừa đủ cho 2 digits
                min={8} // Minimum readable size
                max={72} // Maximum reasonable size
              />
            </div>
          </div>

          {/* 
            TEXT FORMAT BUTTONS GROUP
            
            Group 3 toggle buttons cho text formatting:
            - Bold: In đậm text
            - Italic: In nghiêng text  
            - Underline: Gạch chân text
            
            Design pattern:
            - type="primary" khi active (tạo visual feedback)
            - type="default" khi inactive
            - onClick toggle boolean state
            - Icon từ lucide-react với size consistent
          */}
          <div className="form-group">
            <div className="text-format-buttons">
              {/* BOLD TOGGLE BUTTON */}
              <Button
                size="small"
                type={config.bold ? "primary" : "default"} // Conditional styling
                icon={<Bold size={12} />} // Icon với size cố định
                onClick={() =>
                  handleUpdateFormatConfig(sectionKey, "bold", !config.bold)
                } // Toggle boolean value
              />

              {/* ITALIC TOGGLE BUTTON */}
              <Button
                size="small"
                type={config.italic ? "primary" : "default"}
                icon={<Italic size={12} />}
                onClick={() =>
                  handleUpdateFormatConfig(sectionKey, "italic", !config.italic)
                }
              />

              {/* UNDERLINE TOGGLE BUTTON */}
              <Button
                size="small"
                type={config.underline ? "primary" : "default"}
                icon={<Underline size={12} />}
                onClick={() =>
                  handleUpdateFormatConfig(
                    sectionKey,
                    "underline",
                    !config.underline
                  )
                }
              />
            </div>
          </div>

          {/* 
            COLOR PICKER GROUP
            
            Group cho việc chọn màu sắc text legend.
            Bao gồm:
            1. ColorPicker component từ Ant Design
            2. Color preview hiển thị màu hiện tại
            3. Search button (có thể extend để search màu)
            
            ColorPicker features:
            - Palette màu chuẩn
            - Input hex code trực tiếp
            - Preview real-time
            - showText() để custom display
          */}
          <div className="form-group">
            <Typography.Text className="form-label">Color</Typography.Text>
            <div className="color-picker-row">
              {/* 
                ANT DESIGN COLOR PICKER
                
                Component chính để chọn màu với đầy đủ features:
                - Click mở color palette
                - Drag để chọn màu trong spectrum
                - Input hex/rgb/hsl values
                - onChange callback với color object
                - showText để render custom preview
              */}
              <ColorPicker
                size="small"
                value={config.color || "#666666"} // Default gray color
                onChange={(color) =>
                  handleUpdateFormatConfig(
                    sectionKey,
                    "color",
                    color.toHexString() // Convert color object to hex string
                  )
                }
                showText={() => (
                  /* 
                    COLOR PREVIEW ELEMENT
                    
                    Div nhỏ hiển thị màu hiện tại như một square.
                    Sử dụng inline style (có thể move to CSS sau).
                    className "effects-color-display" để styling consistent.
                  */
                  <div
                    className="effects-color-display"
                    style={{
                      backgroundColor: config.color || "#666666",
                    }}
                  />
                )}
              />

              {/* 
                SEARCH BUTTON
                
                Button phụ có thể extend để implement tìm kiếm màu.
                Hiện tại là placeholder, có thể implement:
                - Search trong palette màu định sẵn
                - Search theo tên màu (red, blue, etc.)
                - Recent colors history
              */}
              <Button size="small" icon={<Search size={12} />} />
            </div>
          </div>
        </div>
      </ConfigSection>

      {/* 
        TITLE SUB-SECTION
        
        Section đặc biệt để cấu hình tiêu đề cho Legend.
        Features:
        - hasToggle=true: Có switch để bật/tắt title
        - toggleValue: Trạng thái hiện tại của switch
        - onToggleChange: Callback khi user toggle switch
        - Input field để nhập text cho title
        
        Use case: Legend title giúp mô tả ý nghĩa của legend,
        VD: "Product Categories", "Sales Regions", etc.
      */}
      <ConfigSection
        title="Title"
        isExpanded={expandedSections.legendTitle}
        onToggle={() => dispatch(toggleSection("legendTitle"))}
        hasToggle={true} // Enable toggle switch trong header
        toggleValue={config.title?.enabled !== false} // Current toggle state
        onToggleChange={(checked: boolean) =>
          handleUpdateFormatConfig(sectionKey, "title", {
            ...config.title, // Preserve existing title properties
            enabled: checked, // Update enabled state
          })
        }
      >
        <div className="section-content">
          {/* 
            TITLE TEXT INPUT
            
            Input field để nhập text cho tiêu đề legend.
            Chỉ hiển thị khi title được enabled (controlled by ConfigSection).
            
            Features:
            - size="small" cho UI compact
            - value với fallback "Legend"
            - onChange update cả text và preserve enabled state
            - width="100%" để fill container
          */}
          <div className="form-group">
            <Typography.Text className="form-label">Title text</Typography.Text>
            <Input
              size="small"
              value={config.title?.text || "Legend"} // Fallback text
              onChange={(e) =>
                handleUpdateFormatConfig(sectionKey, "title", {
                  ...config.title, // Preserve enabled state
                  text: e.target.value, // Update text content
                })
              }
              style={{ width: "100%" }} // Fill available width
            />
          </div>
        </div>
      </ConfigSection>

      {/* 
        RESET TO DEFAULT SECTION
        
        Section cuối cùng chứa button để reset tất cả cài đặt legend
        về giá trị mặc định. Hữu ích khi user muốn quay lại trạng thái ban đầu.
        
        Button design:
        - type="link": Style như hyperlink, không có border
        - icon: RotateCcw (rotate counter-clockwise) để biểu thị reset
        - color: "#0078d4" (Microsoft blue)
        - onClick: gọi resetToDefault function
      */}
      <div className="reset-section">
        <Button
          type="link" // Link style without border
          icon={<RotateCcw size={14} />} // Reset icon
          style={{
            padding: "16px", // Padding for comfortable click area
            fontSize: "12px", // Smaller text size
            color: "#0078d4", // Microsoft blue color
          }}
          onClick={resetToDefault} // Call reset function
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default LegendSection;

/**
 * COMPONENT USAGE EXAMPLE:
 *
 * <LegendSection
 *   config={formatConfig.legend}
 *   sectionKey="legend"
 *   handleUpdateFormatConfig={handleUpdateFormatConfig}
 *   expandedSections={expandedSections}
 * />
 *
 * COMPONENT ARCHITECTURE:
 *
 * LegendSection
 * ├── Options Sub-Section
 * │   └── Position Selector
 * ├── Text Sub-Section
 * │   ├── Font Controls (Family + Size)
 * │   ├── Format Buttons (Bold/Italic/Underline)
 * │   └── Color Picker
 * ├── Title Sub-Section
 * │   ├── Toggle Switch (in header)
 * │   └── Text Input
 * └── Reset Section
 *     └── Reset Button
 *
 * STATE MANAGEMENT:
 *
 * - Redux store quản lý tất cả legend config
 * - expandedSections state cho việc mở/đóng sections
 * - handleUpdateFormatConfig function để sync với Redux
 * - Mỗi thay đổi được reflect realtime trong biểu đồ
 *
 * STYLING APPROACH:
 *
 * - Sử dụng Ant Design components cho consistency
 * - className "form-group", "section-content" cho layout
 * - Inline styles cho một số cases (có thể move to CSS)
 * - Size "small" cho tất cả controls để UI compact
 */
