import { useContext } from "react";
import { PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice, stars } from "../../utils/helpers";
import "./ComparePage.scss";

export function CompareBar() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p, d) => {
    dispatch({ type: "SET_PAGE", page: p, data: d });
    window.scrollTo(0, 0);
  };
  if (state.compareList.length === 0) return null;
  const products = state.compareList
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);
  return (
    <div className="compare-bar">
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--muted)",
          whiteSpace: "nowrap",
        }}
      >
        So sánh:
      </span>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--card2)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
          }}
        >
          <span>{p.emoji}</span>
          <span
            style={{
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.name}
          </span>
          <span
            style={{ cursor: "pointer", color: "var(--muted)", fontSize: 14 }}
            onClick={() => dispatch({ type: "TOGGLE_COMPARE", id: p.id })}
          >
            ×
          </span>
        </div>
      ))}
      {state.compareList.length >= 2 && (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => nav("compare")}
        >
          So sánh →
        </button>
      )}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => dispatch({ type: "CLEAR_COMPARE" })}
      >
        ✕
      </button>
    </div>
  );
}

export function ComparePage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p, d) => {
    dispatch({ type: "SET_PAGE", page: p, data: d });
    window.scrollTo(0, 0);
  };
  const products = (state.compareList || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  if (products.length < 2)
    return (
      <div
        className="page"
        style={{ padding: "100px 24px", textAlign: "center" }}
      >
        <div style={{ fontSize: 60, marginBottom: 16 }}>⚖️</div>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 24,
            marginBottom: 10,
          }}
        >
          Chọn ít nhất 2 sản phẩm để so sánh
        </h2>
        <button className="btn btn-primary" onClick={() => nav("products")}>
          Chọn sản phẩm
        </button>
      </div>
    );

  const allSpecKeys = [
    ...new Set(products.flatMap((p) => Object.keys(p.specs))),
  ];

  return (
    <div className="page compare-page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">⚖️ So sánh sản phẩm</h1>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
            So sánh {products.length} sản phẩm
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1100,
          margin: "32px auto",
          padding: "0 24px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          {/* Header */}
          <thead>
            <tr>
              <th
                style={{
                  width: 160,
                  padding: "12px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px 0 0 0",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "var(--muted)",
                  textAlign: "left",
                }}
              >
                Tiêu chí
              </th>
              {products.map((p, i) => (
                <th
                  key={p.id}
                  style={{
                    padding: "16px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                    borderRadius: i === products.length - 1 ? "0 8px 0 0" : 0,
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{p.emoji}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--accent)",
                      marginBottom: 10,
                    }}
                  >
                    {formatPrice(p.price)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        dispatch({ type: "ADD_TO_CART", product: p });
                        dispatch({
                          type: "ADD_TOAST",
                          toast: {
                            type: "success",
                            title: "Đã thêm",
                            msg: p.name,
                          },
                        });
                      }}
                    >
                      🛒 Mua
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 12 }}
                      onClick={() =>
                        dispatch({ type: "TOGGLE_COMPARE", id: p.id })
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Rating row */}
            <tr>
              <td
                style={{
                  padding: "10px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 600,
                }}
              >
                Đánh giá
              </td>
              {products.map((p) => (
                <td
                  key={p.id}
                  style={{
                    padding: "10px 16px",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                    background: "var(--card)",
                  }}
                >
                  <div className="stars" style={{ fontSize: 13 }}>
                    {stars(p.rating)}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {p.rating}/5 ({p.reviews})
                  </div>
                </td>
              ))}
            </tr>
            {/* Sold row */}
            <tr>
              <td
                style={{
                  padding: "10px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 600,
                }}
              >
                Đã bán
              </td>
              {products.map((p) => {
                const maxSold = Math.max(...products.map((x) => x.sold));
                return (
                  <td
                    key={p.id}
                    style={{
                      padding: "10px 16px",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      background: "var(--card)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        color:
                          p.sold === maxSold ? "var(--green)" : "var(--text)",
                        fontWeight: p.sold === maxSold ? 700 : 400,
                      }}
                    >
                      {p.sold.toLocaleString()}
                    </span>
                    {p.sold === maxSold && (
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--green)",
                          marginLeft: 4,
                        }}
                      >
                        🏆
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
            {/* Price compare */}
            <tr>
              <td
                style={{
                  padding: "10px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 600,
                }}
              >
                Giá
              </td>
              {products.map((p) => {
                const minPrice = Math.min(...products.map((x) => x.price));
                return (
                  <td
                    key={p.id}
                    style={{
                      padding: "10px 16px",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      background:
                        p.price === minPrice
                          ? "rgba(0,230,118,.05)"
                          : "var(--card)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 16,
                        fontWeight: 800,
                        color:
                          p.price === minPrice
                            ? "var(--green)"
                            : "var(--accent)",
                      }}
                    >
                      {formatPrice(p.price)}
                    </div>
                    {p.price === minPrice && (
                      <div style={{ fontSize: 10, color: "var(--green)" }}>
                        Rẻ nhất 💚
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
            {/* Spec rows */}
            {allSpecKeys.map((key, ki) => (
              <tr
                key={key}
                style={{ background: ki % 2 === 0 ? "transparent" : undefined }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {key}
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    style={{
                      padding: "10px 16px",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      background: "var(--card)",
                      fontSize: 13,
                      color: p.specs[key] ? "var(--text)" : "var(--muted)",
                    }}
                  >
                    {p.specs[key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
