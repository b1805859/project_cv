import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./AdminCreateTab.scss";

export function AdminCreateTab() {
  const { dispatch } = useContext(AppContext);
  const [createType, setCreateType] = useState("product");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    dispatch({
      type: "ADD_TOAST",
      toast: { type: "success", title: "Thành công!", msg: `Đã lưu ${createType === 'product' ? 'sản phẩm' : 'danh mục'} mới` }
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  return (
    <div className="admin-create-tab">
      <div className="create-header">
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 800 }}>
            ✨ Tạo mới
          </h2>
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            Thêm sản phẩm hoặc danh mục mới vào hệ thống
          </div>
        </div>
        <div className="type-selector">
          <button 
            className={`type-btn ${createType === "product" ? "active" : ""}`}
            onClick={() => setCreateType("product")}
          >
            📦 Sản phẩm
          </button>
          <button 
            className={`type-btn ${createType === "category" ? "active" : ""}`}
            onClick={() => setCreateType("category")}
          >
            🏷️ Danh mục
          </button>
        </div>
      </div>

      {createType === "product" ? (
        <div className="form-layout">
          {/* Cột trái */}
          <div className="form-main">
            <div className="form-section">
              <div className="section-title">📝 Thông tin chung</div>
              <div className="form-group">
                <label className="form-label">Tên sản phẩm</label>
                <input type="text" className="input" placeholder="Nhập tên sản phẩm..." />
              </div>
              <div className="form-group">
                <label className="form-label">Thương hiệu</label>
                <input type="text" className="input" placeholder="VD: Apple, Samsung..." />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Mô tả chi tiết</label>
                <div className="rich-text-toolbar">
                  <button className="toolbar-btn">B</button>
                  <button className="toolbar-btn">I</button>
                  <button className="toolbar-btn">U</button>
                  <div style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />
                  <button className="toolbar-btn">🔗</button>
                  <button className="toolbar-btn">🖼️</button>
                  <button className="toolbar-btn">📝</button>
                </div>
                <div 
                  className="rich-text-editor" 
                  contentEditable 
                  placeholder="Nhập mô tả sản phẩm ở đây..."
                ></div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">🖼️ Media & Hình ảnh</div>
              <div
              className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleSelectImage}
            >
                <div className="drag-drop-icon">📥</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Kéo thả hình ảnh vào đây</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                  Hỗ trợ JPG, PNG, WEBP (Tối đa 5MB)
                </div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); handleSelectImage(); }}>
                  Chọn từ máy tính
                </button>
                <input
                  ref={fileInputRef}
                  className="file-input-hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {previewUrl && (
                <div className="image-preview-container">
                  <img src={previewUrl} alt="Ảnh sản phẩm" />
                  <div className="preview-label">Ảnh đã chọn để upload</div>
                </div>
              )}
            </div>
            
            <div className="form-section">
              <div className="section-title">💰 Giá & Kho hàng</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Giá bán (VNĐ)</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div className="form-group">
                  <label className="form-label">Giá gốc (VNĐ)</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Mã SKU</label>
                  <input type="text" className="input" placeholder="SP-001" />
                </div>
                <div className="form-group">
                  <label className="form-label">Số lượng tồn kho</label>
                  <input type="number" className="input" placeholder="100" />
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="form-sidebar">
            <div className="form-section">
              <div className="section-title">🚀 Đăng sản phẩm</div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
                  <input type="radio" name="status" defaultChecked /> Hiển thị ngay
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", marginTop: 10 }}>
                  <input type="radio" name="status" /> Lưu nháp
                </label>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="btn btn-primary w-full" onClick={handleSave}>Lưu sản phẩm</button>
                <button className="btn btn-ghost w-full">Hủy bỏ</button>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">🏷️ Phân loại</div>
              <div className="form-group">
                <label className="form-label">Danh mục chính</label>
                <select className="select w-full">
                  <option>Điện thoại</option>
                  <option>Laptop</option>
                  <option>Tablet</option>
                  <option>Âm thanh</option>
                  <option>Phụ kiện</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon / Emoji đại diện</label>
                <input type="text" className="input" placeholder="📱" />
              </div>
              <div className="form-group">
                <label className="form-label">Tags</label>
                <input type="text" className="input" placeholder="VD: Mới, Khuyến mãi..." />
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", marginBottom: 8 }}>
                  <input type="checkbox" /> Sản phẩm Mới (New)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" /> Sản phẩm Nổi bật (Hot)
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-layout">
          <div className="form-main">
            <div className="form-section">
              <div className="section-title">📁 Thông tin Danh mục</div>
              <div className="form-group">
                <label className="form-label">Tên danh mục</label>
                <input type="text" className="input" placeholder="Nhập tên danh mục..." />
              </div>
              <div className="form-group">
                <label className="form-label">Đường dẫn (Slug)</label>
                <input type="text" className="input" placeholder="dien-thoai" />
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Để trống để tự tạo từ tên danh mục.</div>
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả danh mục</label>
                <textarea className="input" placeholder="Mô tả ngắn gọn về danh mục này..." style={{ minHeight: 120, resize: "vertical" }} />
              </div>
            </div>
          </div>

          <div className="form-sidebar">
            <div className="form-section">
              <div className="section-title">🚀 Lưu danh mục</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="btn btn-primary w-full" onClick={handleSave}>Tạo danh mục</button>
                <button className="btn btn-ghost w-full">Hủy bỏ</button>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">🎨 Hiển thị</div>
              <div className="form-group">
                <label className="form-label">Danh mục cha</label>
                <select className="select w-full">
                  <option>Không có (Danh mục gốc)</option>
                  <option>Điện thoại</option>
                  <option>Laptop</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon / Emoji</label>
                <input type="text" className="input" placeholder="📱" />
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> Hiển thị trên Menu chính
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
