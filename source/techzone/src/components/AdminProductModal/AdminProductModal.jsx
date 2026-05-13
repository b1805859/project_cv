import { useState, useContext } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { AppContext } from '../../context/AppContext';
import "./AdminProductModal.scss";

export function AdminProductModal({ product, onClose }) {
  const { dispatch } = useContext(AppContext);
  const isEdit = !!product;
  const [form, setForm] = useState(() => product || {
    id: Date.now(), name:'', category:'Laptop', catId:1, price:'', oldPrice:'',
    rating:4.5, reviews:0, emoji:'📦', sold:0, stock:10, brand:'',
    specs:{}, description:'', isNew:false, isHot:false
  });
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  function save() {
    if (!form.name || !form.price || !form.brand) {
      dispatch({ type:'ADD_TOAST', toast:{ type:'error', title:'Thiếu thông tin bắt buộc' } }); return;
    }
    const prod = { ...form, price: Number(form.price), oldPrice: form.oldPrice ? Number(form.oldPrice) : null };
    dispatch({ type: isEdit ? 'ADMIN_UPDATE_PRODUCT' : 'ADMIN_ADD_PRODUCT', product: prod });
    dispatch({ type:'ADD_TOAST', toast:{ type:'success', title: isEdit ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!' } });
    onClose();
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

        <div className="form-group form-row-custom">
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
          <button className="btn btn-ghost" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" onClick={save}>{isEdit ? '💾 Lưu thay đổi' : '➕ Thêm sản phẩm'}</button>
        </div>
      </div>
    </div>
  );
}
