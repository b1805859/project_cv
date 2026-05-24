import { useState, useContext, useEffect } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { fileApi } from '../../api/fileApi';
import { productService } from '../../services/productService';
import { AppContext } from '../../context/AppContext';
import "./AdminProductModal.scss";

export function AdminProductModal({ product, onClose }) {
  const { dispatch } = useContext(AppContext);
  const isEdit = !!product;
  const [form, setForm] = useState(() => product || {
    id: Date.now(), name:'', category:'Laptop', catId:1, price:'', oldPrice:'',
    imageUrl: product?.imageUrl || product?.imgUrl || '', images: product?.images || [], videoUrl: product?.videoUrl || '', rating:4.5, reviews:0, emoji:'📦', sold:0, stock:10, brand:'',
    specs:{}, description:'', isNew:false, isHot:false
  });
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [previewItems, setPreviewItems] = useState(() => {
    if (product?.images && product.images.length > 0) {
      return product.images.map((src, idx) => ({ id: `${Date.now()}-${idx}`, src, file: null }));
    }
    if (product?.imageUrl) {
      return [{ id: `${Date.now()}-0`, src: product.imageUrl, file: null }];
    }
    return [];
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return () => {
      // revoke any blob URLs created for previews
      (previewItems || []).forEach(item => {
        try {
          if (item?.src && item.src.startsWith && item.src.startsWith('blob:')) {
            URL.revokeObjectURL(item.src);
          }
        } catch {
          // ignore preview URL cleanup errors
        }
      });
    };
  }, [previewItems]);

  function createPreviewItem(source, file = null) {
    return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, src: source, file };
  }

  function handleFileChange(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const newItems = files.map(f => createPreviewItem(URL.createObjectURL(f), f));
    setPreviewItems(prev => [...prev, ...newItems]);

    if (event.target instanceof HTMLInputElement) {
      event.target.value = '';
    }
  }

  function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files || []);
    if (!files.length) return;

    const newItems = files.map(f => createPreviewItem(URL.createObjectURL(f), f));
    setPreviewItems(prev => [...prev, ...newItems]);
  }

  function movePreviewItem(fromIndex, toIndex) {
    setPreviewItems(prev => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const items = [...prev];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }

  function handleThumbDragStart(index, event) {
    event.dataTransfer.effectAllowed = 'move';
    setDraggedIndex(index);
  }

  function handleThumbDragOver(index, event) {
    event.preventDefault();
    setDragOverIndex(index);
  }

  function handleThumbDragLeave(index) {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  }

  function handleThumbDrop(index, event) {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      movePreviewItem(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleThumbDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  async function save() {
    if (!form.name || !form.price || !form.brand) {
      dispatch({ type:'ADD_TOAST', toast:{ type:'error', title:'Thiếu thông tin bắt buộc' } });
      return;
    }

    setSaving(true);
    try {
      const finalImages = [];
      for (const item of previewItems) {
        if (item.file) {
          const res = await fileApi.uploadFile(item.file);
          const u = res?.data?.imgUrl;
          if (u) finalImages.push(u);
        } else if (item.src) {
          finalImages.push(item.src);
        }
      }

      const payload = {
        ...form,
        images: finalImages,
        imageUrl: finalImages[0] || form.imageUrl || '',
        imgUrl: finalImages[0] || form.imageUrl || '',
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        videoUrl: form.videoUrl || null,
      };

      const savedProduct = await productService.saveProduct(payload, isEdit ? product.id : null);
      dispatch({ type: isEdit ? 'ADMIN_UPDATE_PRODUCT' : 'ADMIN_ADD_PRODUCT', product: savedProduct });
      dispatch({ type:'ADD_TOAST', toast:{ type:'success', title: isEdit ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!' } });
      onClose();
    } catch (error) {
      dispatch({
        type: 'ADD_TOAST',
        toast: {
          type: 'error',
          title: 'Lưu sản phẩm thất bại',
          message: error?.message || 'Vui lòng thử lại.',
        },
      });
    } finally {
      setSaving(false);
    }
  }

  function addSpec() {
    if (!specKey || !specVal) return;
    setForm(f => ({ ...f, specs: { ...f.specs, [specKey]: specVal } }));
    setSpecKey(''); setSpecVal('');
  }

  const catOptions = CATEGORIES.map(c => ({ id:c.id, name:c.name }));
  const emojiOptions = ['💻','🎮','🎧','⌨️','📱','💾','🔋','🖥️','🖱️','🎬','🎵','📷'];

  return (
    <div className="admin-product-modal modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal modal-custom">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-title">{isEdit ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm mới'}</div>

        <div className="form-row form-row-custom">
          <div className="form-group form-group-no-margin form-group-full">
            <label className="form-label">Media & Hình ảnh</label>
            <div
              className={`upload-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📁</div>
              <div className="upload-title">Kéo thả hình ảnh vào đây</div>
              <div className="upload-hint">Hỗ trợ JPG, PNG, WEBP (Tối đa 5MB)</div>
              <label className="upload-button" htmlFor="product-image-input">
                Chọn từ máy tính
              </label>
              <input
                id="product-image-input"
                className="file-input-hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <small className="upload-note">Hoặc dán URL ảnh vào ô dưới đây nếu không muốn upload.</small>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input
                className="input"
                type="url"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={{ flex: 1 }}
              />
              <button className="btn btn-secondary" onClick={() => {
                if (!newImageUrl) return; setPreviewItems(prev => [...prev, createPreviewItem(newImageUrl)]); setNewImageUrl('');
              }}>Thêm</button>
            </div>
            <small className="upload-note">Ảnh preview (dùng nút lên/xuống để sắp xếp thứ tự):</small>
            <div className="image-thumbs" style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {previewItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`thumb-item ${draggedIndex === idx ? 'dragging' : ''} ${dragOverIndex === idx ? 'drag-over' : ''}`}
                  draggable
                  onDragStart={e => handleThumbDragStart(idx, e)}
                  onDragOver={e => handleThumbDragOver(idx, e)}
                  onDragLeave={() => handleThumbDragLeave(idx)}
                  onDrop={e => handleThumbDrop(idx, e)}
                  onDragEnd={handleThumbDragEnd}
                >
                  <img src={item.src} alt={`preview-${idx}`} className="thumb-image" />
                  <button type="button" className="thumb-remove" onClick={() => setPreviewItems(prev => prev.filter((x) => x.id !== item.id))}>×</button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <label className="form-label">Video (YouTube URL)</label>
              <input className="input" type="url" value={form.videoUrl||''} onChange={e => setForm({...form,videoUrl:e.target.value})} placeholder="https://www.youtube.com/watch?v=..." />
            </div>
          </div>
        </div>

        <div className="form-row form-row-custom">
          <div className="form-group form-group-no-margin">
            <label className="form-label">Tên sản phẩm *</label>
            <input className="input" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="VD: MacBook Pro M3"/>
          </div>
          <div className="form-group form-group-no-margin">
            <label className="form-label">Thương hiệu *</label>
            <input className="input" value={form.brand} onChange={e => setForm({...form,brand:e.target.value})} placeholder="VD: Apple"/>
          </div>
        </div>

        <div className="form-row form-row-custom">
          <div className="form-group form-group-no-margin">
            <label className="form-label">Giá bán (VND) *</label>
            <input className="input" type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="42990000"/>
          </div>
          <div className="form-group form-group-no-margin">
            <label className="form-label">Giá gốc (VND)</label>
            <input className="input" type="number" value={form.oldPrice||''} onChange={e => setForm({...form,oldPrice:e.target.value})} placeholder="49990000"/>
          </div>
        </div>

        <div className="form-row form-row-custom">
          <div className="form-group form-group-no-margin">
            <label className="form-label">Danh mục</label>
            <select className="input select" value={form.catId} onChange={e => {
              const cat = CATEGORIES.find(c => c.id === Number(e.target.value));
              setForm({...form, catId:Number(e.target.value), category:cat?.name||''});
            }}>
              {catOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group form-group-no-margin">
            <label className="form-label">Tồn kho</label>
            <input className="input" type="number" value={form.stock} onChange={e => setForm({...form,stock:Number(e.target.value)})}/>
          </div>
        </div>

        <div className="form-row form-row-custom">
          <div className="form-group form-group-no-margin form-group-full">
            <label className="form-label">Emoji icon</label>
            <div className="emoji-options">
              {emojiOptions.map(e => (
                <div 
                  key={e} 
                  className={`emoji-box ${form.emoji === e ? 'active' : ''}`}
                  onClick={() => setForm({...form,emoji:e})}
                >
                  {e}
                </div>
              ))}
              <input className="input emoji-input" value={form.emoji} onChange={e => setForm({...form,emoji:e.target.value})} />
            </div>
          </div>
        </div>

        <div className="form-group description-area">
          <label className="form-label">Mô tả</label>
          <textarea className="comment-textarea" value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="Mô tả sản phẩm..."/>
        </div>

        {/* SPECS */}
        <div className="form-group specs-section">
          <label className="form-label">Thông số kỹ thuật</label>
          <div className="specs-input-row">
            <input className="input" placeholder="Thuộc tính (VD: CPU)" value={specKey} onChange={e => setSpecKey(e.target.value)} style={{flex:1}}/>
            <input className="input" placeholder="Giá trị (VD: M3 Pro)" value={specVal} onChange={e => setSpecVal(e.target.value)} style={{flex:1}}/>
            <button className="btn btn-secondary btn-sm" onClick={addSpec}>+</button>
          </div>
          <div className="specs-list">
            {Object.entries(form.specs).map(([k,v]) => (
              <div key={k} className="spec-item">
                <span className="spec-key">{k}</span>
                <span className="spec-val">{v}</span>
                <span className="remove-spec" onClick={() => { const s={...form.specs}; delete s[k]; setForm({...form,specs:s}); }}>×</span>
              </div>
            ))}
          </div>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input className="new" type="checkbox" checked={form.isNew} onChange={e => setForm({...form,isNew:e.target.checked})}/>
            <span>🆕 Sản phẩm mới</span>
          </label>
          <label className="checkbox-label">
            <input className="hot" type="checkbox" checked={form.isHot} onChange={e => setForm({...form,isHot:e.target.checked})}/>
            <span>🔥 Hot</span>
          </label>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={saving}>Hủy</button>
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? 'Đang lưu...' : isEdit ? '💾 Lưu thay đổi' : '➕ Thêm sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  );
}
