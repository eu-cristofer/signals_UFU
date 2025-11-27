const V = {
  viewMode: "Day",
  phasePanelWidth: 200,
  rowHeight: 40,
  headerHeight: 65,
  upperFormat: "MMMM YYYY",
  lowerFormat: "DD",
  readonly: !1,
  readonlyDates: !1,
  readonlyProgress: !1,
  onClick: () => {
  },
  onDateChange: () => {
  },
  onProgressChange: () => {
  },
  onViewChange: () => {
  },
  padding: {
    Day: { amount: 1, unit: "week" },
    Week: { amount: 1, unit: "month" },
    Month: { amount: 1, unit: "year" },
    Year: { amount: 2, unit: "year" }
  }
};
function I(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return typeof t.id == "string" && typeof t.name == "string" && typeof t.color == "string";
}
function O(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return typeof t.id == "string" && typeof t.name == "string" && typeof t.start == "string" && typeof t.end == "string" && typeof t.progress == "number" && Array.isArray(t.dependencies) && t.dependencies.every((e) => typeof e == "string") && typeof t.phase == "string" && (t.color === void 0 || typeof t.color == "string");
}
function H(r) {
  if (typeof r != "object" || r === null) return !1;
  const t = r;
  return Array.isArray(t.phases) && t.phases.every(I) && Array.isArray(t.tasks) && t.tasks.every(O);
}
async function at(r) {
  try {
    const t = await fetch(r);
    if (!t.ok)
      throw new Error(`Failed to fetch data: ${t.status} ${t.statusText}`);
    const e = await t.json();
    if (!H(e))
      throw new Error("Invalid Gantt data format");
    return e;
  } catch (t) {
    throw t instanceof Error ? new Error(`Failed to load Gantt data: ${t.message}`) : new Error("Failed to load Gantt data: Unknown error");
  }
}
function ot(r) {
  return H(r);
}
function f(r) {
  if (r instanceof Date) {
    if (isNaN(r.getTime()))
      throw new Error("Invalid Date object");
    return new Date(r);
  }
  if (typeof r == "number") {
    const t = new Date(r);
    if (isNaN(t.getTime()))
      throw new Error(`Invalid timestamp: ${r}`);
    return t;
  }
  if (typeof r == "string") {
    const t = new Date(r);
    if (isNaN(t.getTime()))
      throw new Error(`Invalid date string: ${r}`);
    return t;
  }
  throw new Error(`Unsupported date input type: ${typeof r}`);
}
function ht(r) {
  try {
    return typeof r != "string" && typeof r != "number" && !(r instanceof Date) ? !1 : (f(r), !0);
  } catch {
    return !1;
  }
}
function ct(r) {
  const t = r.getFullYear(), e = String(r.getMonth() + 1).padStart(2, "0"), s = String(r.getDate()).padStart(2, "0");
  return `${t}-${e}-${s}`;
}
const C = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], b = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], z = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function y(r, t) {
  const e = r.getFullYear(), s = r.getMonth(), n = r.getDate(), i = r.getDay();
  switch (t) {
    case "YYYY-MM-DD":
      return `${e}-${String(s + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
    case "YYYY-MM":
      return `${e}-${String(s + 1).padStart(2, "0")}`;
    case "YYYY":
      return `${e}`;
    case "MMM DD":
      return `${b[s]} ${String(n).padStart(2, "0")}`;
    case "MMM DD, YYYY":
      return `${b[s]} ${String(n).padStart(2, "0")}, ${e}`;
    case "DD MMM":
      return `${String(n).padStart(2, "0")} ${b[s]}`;
    case "DD MMM YYYY":
      return `${String(n).padStart(2, "0")} ${b[s]} ${e}`;
    case "ddd, MMM DD":
      return `${z[i]}, ${b[s]} ${String(n).padStart(2, "0")}`;
    case "MMMM YYYY":
      return `${C[s]} ${e}`;
    case "MMMM":
      return `${C[s]}`;
    case "Quarter":
      return `Q${Math.floor(s / 3) + 1}`;
    case "DD":
      return `${String(n).padStart(2, "0")}`;
    default:
      const o = t;
      throw new Error(`Unsupported format: ${o}`);
  }
}
function g(r, t, e) {
  const s = new Date(r);
  switch (e) {
    case "millisecond":
      s.setMilliseconds(s.getMilliseconds() + t);
      break;
    case "second":
      s.setSeconds(s.getSeconds() + t);
      break;
    case "minute":
      s.setMinutes(s.getMinutes() + t);
      break;
    case "hour":
      s.setHours(s.getHours() + t);
      break;
    case "day":
      s.setDate(s.getDate() + t);
      break;
    case "week":
      s.setDate(s.getDate() + t * 7);
      break;
    case "month":
      s.setMonth(s.getMonth() + t);
      break;
    case "year":
      s.setFullYear(s.getFullYear() + t);
      break;
    case "quarter":
      s.setMonth(s.getMonth() + t * 3);
      break;
    default:
      const n = e;
      throw new Error(`Unsupported unit: ${n}`);
  }
  return s;
}
function q(r, t, e) {
  return g(r, -t, e);
}
function U(r, t, e, s = {}) {
  const { fractional: n = !1, round: i = "floor" } = s, o = r.getTime(), c = t.getTime(), a = o - c;
  let h;
  switch (e) {
    case "millisecond":
      h = a;
      break;
    case "second":
      h = a / 1e3;
      break;
    case "minute":
      h = a / (1e3 * 60);
      break;
    case "hour":
      h = a / (1e3 * 60 * 60);
      break;
    case "day":
      h = a / (1e3 * 60 * 60 * 24);
      break;
    case "week":
      h = a / (1e3 * 60 * 60 * 24 * 7);
      break;
    case "quarter":
      h = a / (1e3 * 60 * 60 * 24 * 30.44 * 3);
      break;
    case "month":
      h = a / (1e3 * 60 * 60 * 24 * 30.44);
      break;
    case "year":
      h = a / (1e3 * 60 * 60 * 24 * 365.25);
      break;
    default:
      const d = e;
      throw new Error(`Unsupported unit: ${d}`);
  }
  if (n)
    return h;
  switch (i) {
    case "floor":
      return Math.floor(h);
    case "ceil":
      return Math.ceil(h);
    case "round":
      return Math.round(h);
    default:
      const d = i;
      throw new Error(`Unsupported rounding: ${d}`);
  }
}
function dt(r, t) {
  return U(t, r, "day", { round: "ceil" });
}
function T(r, t) {
  const e = new Date(r);
  switch (t) {
    case "year":
      e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
      break;
    case "month":
      e.setDate(1), e.setHours(0, 0, 0, 0);
      break;
    case "quarter":
      const s = Math.floor(e.getMonth() / 3) * 3;
      e.setMonth(s, 1), e.setHours(0, 0, 0, 0);
      break;
    case "week":
      const n = e.getDay();
      e.setDate(e.getDate() - n), e.setHours(0, 0, 0, 0);
      break;
    case "day":
      e.setHours(0, 0, 0, 0);
      break;
    case "hour":
      e.setMinutes(0, 0, 0);
      break;
    case "minute":
      e.setSeconds(0, 0);
      break;
    case "second":
      e.setMilliseconds(0);
      break;
    case "millisecond":
      break;
    default:
      const i = t;
      throw new Error(`Unsupported unit: ${i}`);
  }
  return e;
}
function lt(r, t) {
  const e = new Date(r);
  switch (t) {
    case "year":
      e.setMonth(11, 31), e.setHours(23, 59, 59, 999);
      break;
    case "month":
      e.setMonth(e.getMonth() + 1, 0), e.setHours(23, 59, 59, 999);
      break;
    case "quarter":
      const s = Math.floor((e.getMonth() + 1) / 3) * 3 - 1;
      e.setMonth(s, 31), e.setHours(23, 59, 59, 999);
      break;
    case "week":
      const n = e.getDay();
      e.setDate(e.getDate() + (6 - n)), e.setHours(23, 59, 59, 999);
      break;
    case "day":
      e.setHours(23, 59, 59, 999);
      break;
    case "hour":
      e.setMinutes(59, 59, 999);
      break;
    case "minute":
      e.setSeconds(59, 999);
      break;
    case "second":
      e.setMilliseconds(999);
      break;
    case "millisecond":
      break;
    default:
      const i = t;
      throw new Error(`Unsupported unit: ${i}`);
  }
  return e;
}
function G(r) {
  const t = r.match(/^(\d+)([dwmy])$/);
  if (!t)
    throw new Error(`Invalid duration format: ${r}. Expected format: "5d", "2w", "3m", or "1y"`);
  const e = parseInt(t[1], 10), s = t[2];
  let n;
  switch (s) {
    case "d":
      n = "day";
      break;
    case "w":
      n = "week";
      break;
    case "m":
      n = "month";
      break;
    case "y":
      n = "year";
      break;
    default:
      throw new Error(`Unsupported duration unit: ${s}`);
  }
  return { amount: e, unit: n };
}
function ut(r, t) {
  const { amount: e, unit: s } = G(t);
  return g(r, e, s);
}
function gt(r, t) {
  const { amount: e, unit: s } = G(t);
  return q(r, e, s);
}
function pt(r, t) {
  return r.getTime() < t.getTime();
}
function ft(r, t) {
  return r.getTime() > t.getTime();
}
function wt(r, t) {
  return r.getFullYear() === t.getFullYear() && r.getMonth() === t.getMonth() && r.getDate() === t.getDate();
}
function mt(r, t, e) {
  const s = r.getTime();
  return s >= t.getTime() && s <= e.getTime();
}
function F(...r) {
  if (r.length === 0)
    throw new Error("Cannot find minimum of empty array");
  return new Date(Math.min(...r.map((t) => t.getTime())));
}
function R(...r) {
  if (r.length === 0)
    throw new Error("Cannot find maximum of empty array");
  return new Date(Math.max(...r.map((t) => t.getTime())));
}
function bt(r) {
  return new Date(r);
}
function Mt() {
  return T(/* @__PURE__ */ new Date(), "day");
}
const A = {
  minWidth: 10,
  maxWidth: 1 / 0,
  heightRatio: 0.7,
  verticalPadding: 6,
  cornerRadius: 4,
  showLabels: !0,
  labelFontSize: 12,
  showProgress: !0,
  progressOpacity: 0.4
}, yt = {
  height: 24,
  cornerRadius: 4,
  showLabel: !0,
  minLabelWidth: 80
}, E = {
  Day: {
    columnWidth: 30,
    step: 1,
    unit: "day",
    lowerFormat: "DD",
    upperFormat: "MMMM YYYY"
  },
  Week: {
    columnWidth: 80,
    step: 1,
    unit: "week",
    lowerFormat: "DD",
    upperFormat: "MMMM YYYY"
  },
  Month: {
    columnWidth: 120,
    step: 1,
    unit: "month",
    lowerFormat: "MMMM",
    upperFormat: "YYYY"
  },
  Quarter: {
    columnWidth: 100,
    step: 1,
    unit: "quarter",
    lowerFormat: "Quarter",
    upperFormat: "YYYY"
  },
  Year: {
    columnWidth: 180,
    step: 1,
    unit: "quarter",
    lowerFormat: "Quarter",
    upperFormat: "YYYY"
  }
};
function P(r) {
  return E[r];
}
function k(r, t, e) {
  const s = E[e], n = r.getTime() - t.getTime();
  let i;
  switch (s.unit) {
    case "day":
      i = n / (1e3 * 60 * 60 * 24);
      break;
    case "week":
      i = n / (1e3 * 60 * 60 * 24 * 7);
      break;
    case "month":
      i = n / (1e3 * 60 * 60 * 24 * 30.44);
      break;
    case "quarter":
      i = n / (1e3 * 60 * 60 * 24 * 30.44 * 3);
      break;
    case "year":
      i = n / (1e3 * 60 * 60 * 24 * 365.25);
      break;
    default:
      throw new Error(`Unsupported unit: ${s.unit}`);
  }
  return i * s.columnWidth;
}
function kt(r, t, e) {
  const s = E[e], n = r / s.columnWidth;
  return g(t, n, s.unit);
}
function j(r, t, e) {
  const s = E[e], n = [];
  let i = T(r, s.unit);
  for (; i <= t; )
    n.push({
      date: new Date(i),
      label: y(i, s.lowerFormat),
      width: s.columnWidth
    }), i = g(i, s.step, s.unit);
  return n;
}
const J = {
  height: 24,
  cornerRadius: 3,
  opacity: 0.3,
  showLabels: !0,
  labelFontSize: 12,
  labelColor: "#2c3e50"
};
function Y(r, t, e, s, n = {}) {
  const i = { ...A, ...n }, o = f(r.start), c = f(r.end), a = k(o, e, s);
  let d = k(c, e, s) - a;
  d = Math.max(d, i.minWidth), d = Math.min(d, i.maxWidth);
  const l = t.height * i.heightRatio, u = t.y + i.verticalPadding;
  return {
    x: Math.round(a),
    y: Math.round(u),
    width: Math.round(d),
    height: Math.round(l)
  };
}
function $(r, t, e, s = {}) {
  ({ ...s });
  const n = r.tasks.flatMap((l) => [
    f(l.start),
    f(l.end)
  ]);
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = F(...n), o = R(...n), c = k(i, t, e), h = k(o, t, e) - c, d = r.y;
  return {
    x: Math.round(c),
    y: Math.round(d),
    width: Math.round(h),
    height: Math.round(r.height)
  };
}
function xt(r, t, e) {
  return r.x + r.width >= t && r.x <= e;
}
function N(r, t, e) {
  const s = e * 0.6, n = Math.floor(t / s);
  return n < 3 ? "" : r.length <= n ? r : r.substring(0, n - 3) + "...";
}
function X(r, t) {
  return Math.round(r * t / 100);
}
function Q(r) {
  const t = r.replace("#", ""), e = parseInt(t.substring(0, 2), 16), s = parseInt(t.substring(2, 4), 16), n = parseInt(t.substring(4, 6), 16);
  return (0.299 * e + 0.587 * s + 0.114 * n) / 255 > 0.5 ? "#000000" : "#ffffff";
}
const K = "http://www.w3.org/2000/svg";
function w(r, t = {}) {
  const e = document.createElementNS(K, r);
  return Z(e, t), e;
}
function Z(r, t) {
  Object.entries(t).forEach(([e, s]) => {
    s !== void 0 && r.setAttribute(e, String(s));
  });
}
function p(r) {
  return w("rect", r);
}
function M(r) {
  return w("line", r);
}
function x(r, t = {}) {
  const e = w("text", t);
  return e.textContent = r, e;
}
function Dt(r) {
  return w("path", r);
}
function D(r = {}) {
  return w("g", r);
}
function v(r) {
  for (; r.firstChild; )
    r.removeChild(r.firstChild);
}
function Et(r, t) {
  return Math.sqrt(Math.pow(t.x - r.x, 2) + Math.pow(t.y - r.y, 2));
}
function St(r, t) {
  return r.x >= t.x && r.x <= t.x + t.width && r.y >= t.y && r.y <= t.y + t.height;
}
function vt(r, t, e) {
  return Math.min(Math.max(r, t), e);
}
let tt = 0;
function Ct(r = "gantt") {
  return `${r}-${Date.now()}-${tt++}`;
}
function Pt(r, t) {
  const e = r.getScreenCTM();
  return e ? {
    x: (t.clientX - e.e) / e.a,
    y: (t.clientY - e.f) / e.d
  } : { x: t.clientX, y: t.clientY };
}
class et {
  task;
  taskRow;
  viewStart;
  viewMode;
  config;
  dimensions;
  color;
  group;
  constructor(t, e, s, n, i = {}) {
    this.task = t, this.taskRow = e, this.viewStart = s, this.viewMode = n, this.config = { ...A, ...i }, this.dimensions = Y(
      t,
      e,
      s,
      n,
      this.config
    ), this.color = t.color || e.phase.color, this.group = this.createBarGroup();
  }
  /**
   * Create the complete bar SVG group
   */
  createBarGroup() {
    const t = D({
      class: "task-bar",
      "data-task-id": this.task.id
    }), e = this.createBackground();
    if (t.appendChild(e), this.config.showProgress && this.task.progress > 0) {
      const s = this.createProgress();
      t.appendChild(s);
    }
    if (this.config.showLabels && this.dimensions.width > 30) {
      const s = this.createLabel();
      s && t.appendChild(s);
    }
    return t;
  }
  /**
   * Create background rectangle
   */
  createBackground() {
    return p({
      x: this.dimensions.x,
      y: this.dimensions.y,
      width: this.dimensions.width,
      height: this.dimensions.height,
      rx: this.config.cornerRadius,
      fill: this.color,
      stroke: this.darkenColor(this.color, 0.1),
      "stroke-width": 1,
      class: "bar-background"
    });
  }
  /**
   * Create progress indicator
   */
  createProgress() {
    const t = X(
      this.dimensions.width,
      this.task.progress
    );
    return p({
      x: this.dimensions.x,
      y: this.dimensions.y,
      width: t,
      height: this.dimensions.height,
      rx: this.config.cornerRadius,
      fill: this.darkenColor(this.color, 0.2),
      opacity: this.config.progressOpacity,
      class: "bar-progress"
    });
  }
  /**
   * Create task label
   */
  createLabel() {
    const e = this.dimensions.width - 16;
    if (e < 20)
      return null;
    const s = N(
      this.task.name,
      e,
      this.config.labelFontSize
    );
    if (!s)
      return null;
    const n = Q(this.color);
    return x(s, {
      x: this.dimensions.x + 8,
      y: this.dimensions.y + this.dimensions.height / 2,
      "font-size": this.config.labelFontSize,
      "font-weight": 500,
      fill: n,
      "dominant-baseline": "middle",
      class: "bar-label"
    });
  }
  /**
   * Darken a color by a percentage
   */
  darkenColor(t, e) {
    const s = t.replace("#", "");
    let n = parseInt(s.substring(0, 2), 16), i = parseInt(s.substring(2, 4), 16), o = parseInt(s.substring(4, 6), 16);
    n = Math.round(n * (1 - e)), i = Math.round(i * (1 - e)), o = Math.round(o * (1 - e));
    const c = n.toString(16).padStart(2, "0"), a = i.toString(16).padStart(2, "0"), h = o.toString(16).padStart(2, "0");
    return `#${c}${a}${h}`;
  }
  /**
   * Get the SVG group element
   */
  getElement() {
    return this.group;
  }
  /**
   * Get bar information
   */
  getInfo() {
    return {
      task: this.task,
      taskRow: this.taskRow,
      dimensions: this.dimensions,
      color: this.color,
      element: this.group
    };
  }
  /**
   * Update bar with new view mode
   */
  update(t, e) {
    this.viewStart = t, this.viewMode = e, this.dimensions = Y(
      this.task,
      this.taskRow,
      t,
      e,
      this.config
    );
    const s = this.createBarGroup();
    this.group.parentNode && this.group.parentNode.replaceChild(s, this.group), this.group = s;
  }
  /**
   * Destroy the bar (remove from DOM)
   */
  destroy() {
    this.group.parentNode && this.group.parentNode.removeChild(this.group);
  }
}
class st {
  phaseInfo;
  viewStart;
  viewMode;
  config;
  dimensions;
  group;
  constructor(t, e, s, n = {}) {
    this.phaseInfo = t, this.viewStart = e, this.viewMode = s, this.config = { ...J, ...n }, this.dimensions = $(
      t,
      e,
      s,
      this.config
    ), this.group = this.createPhaseBarGroup();
  }
  createPhaseBarGroup() {
    const t = D({
      class: "phase-bar",
      "data-phase-id": this.phaseInfo.phase.id
    }), e = this.createBackground();
    if (t.appendChild(e), this.config.showLabels && this.dimensions.width > 20) {
      const s = this.createLabel();
      s && t.appendChild(s);
    }
    return t;
  }
  createBackground() {
    return p({
      x: this.dimensions.x,
      y: this.dimensions.y,
      width: this.dimensions.width,
      height: this.dimensions.height,
      rx: this.config.cornerRadius,
      fill: this.phaseInfo.phase.color,
      opacity: this.config.opacity,
      class: "phase-bar-background"
    });
  }
  createLabel() {
    const e = this.dimensions.width - 16;
    if (e < 20)
      return null;
    const s = N(
      this.phaseInfo.phase.name,
      e,
      this.config.labelFontSize
    );
    return s ? x(s, {
      x: this.dimensions.x + 8,
      y: this.dimensions.y + this.dimensions.height / 2,
      "font-size": this.config.labelFontSize,
      "font-weight": 600,
      fill: this.config.labelColor,
      "dominant-baseline": "middle",
      class: "phase-bar-label"
    }) : null;
  }
  getElement() {
    return this.group;
  }
  getInfo() {
    return {
      phase: this.phaseInfo.phase,
      dimensions: this.dimensions,
      element: this.group
    };
  }
  update(t, e) {
    this.viewStart = t, this.viewMode = e, this.dimensions = $(
      this.phaseInfo,
      t,
      e,
      this.config
    );
    const s = this.createPhaseBarGroup();
    this.group.parentNode && this.group.parentNode.replaceChild(s, this.group), this.group = s;
  }
  destroy() {
    this.group.parentNode && this.group.parentNode.removeChild(this.group);
  }
}
function B(r, t, e) {
  const s = [], n = [];
  let i = 0;
  r.phases.forEach((c) => {
    const a = r.tasks.filter((m) => m.phase === c.id);
    if (a.length === 0)
      return;
    const h = i;
    a.forEach((m) => {
      const S = e + i * t;
      s.push({
        task: m,
        phase: c,
        rowIndex: i,
        y: S,
        height: t
      }), i++;
    });
    const d = i - 1, l = a.length * t, u = e + h * t, _ = a.reduce((m, S) => m + S.progress, 0), W = a.length > 0 ? Math.round(_ / a.length) : 0;
    n.push({
      phase: c,
      tasks: a,
      startRow: h,
      endRow: d,
      y: u,
      height: l,
      averageProgress: W
    });
  });
  const o = e + i * t;
  return {
    taskRows: s,
    phases: n,
    totalRows: i,
    totalHeight: o
  };
}
function L(r, t) {
  return t.taskRows.find((e) => e.task.id === r);
}
function Yt(r, t) {
  return t.phases.find((e) => e.phase.id === r);
}
function $t(r, t) {
  return t.taskRows.find((e) => e.rowIndex === r);
}
function Bt(r, t) {
  const e = L(r, t);
  if (e)
    return t.phases.find((s) => s.phase.id === e.phase.id);
}
class rt {
  data;
  rowMapping;
  viewStart;
  viewMode;
  config;
  container;
  bars;
  phaseBars;
  phaseBarsVisible = !0;
  phaseLabelsVisible = !0;
  constructor(t, e, s, n, i, o = {}) {
    this.container = t, this.data = e, this.rowMapping = s, this.viewStart = n, this.viewMode = i, this.config = o, this.bars = /* @__PURE__ */ new Map(), this.phaseBars = /* @__PURE__ */ new Map(), this.renderBars();
  }
  /**
   * Render all task bars
   */
  renderBars() {
    this.clearBars(), this.renderPhaseBars(), this.data.tasks.forEach((t) => {
      const e = L(t.id, this.rowMapping);
      if (!e) {
        console.warn(`Task row not found for task: ${t.id}`);
        return;
      }
      const s = new et(
        t,
        e,
        this.viewStart,
        this.viewMode,
        this.config
      );
      this.container.appendChild(s.getElement()), this.bars.set(t.id, s);
    }), console.log(`Rendered ${this.bars.size} task bars`);
  }
  /**
   * Clear all bars
   */
  clearBars() {
    this.bars.forEach((t) => t.destroy()), this.bars.clear();
  }
  /**
   * Render all phase bars
   */
  renderPhaseBars() {
    this.clearPhaseBars(), this.phaseBarsVisible && this.rowMapping.phases.forEach((t) => {
      const e = new st(
        t,
        this.viewStart,
        this.viewMode,
        {
          showLabels: this.phaseLabelsVisible
        }
      );
      this.container.appendChild(e.getElement()), this.phaseBars.set(t.phase.id, e);
    });
  }
  /**
   * Clear all phase bars
   */
  clearPhaseBars() {
    this.phaseBars.forEach((t) => t.destroy()), this.phaseBars.clear();
  }
  /**
   * Update all bars with new view mode
   */
  updateViewMode(t, e) {
    this.viewStart = t, this.viewMode = e, this.bars.forEach((s) => {
      s.update(t, e);
    }), this.phaseBars.forEach((s) => {
      s.update(t, e);
    });
  }
  /**
   * Set visibility of phase bars
   */
  setPhaseBarsVisibility(t) {
    this.phaseBarsVisible = t, this.renderPhaseBars();
  }
  /**
   * Set visibility of phase labels
   */
  setPhaseLabelsVisibility(t) {
    this.phaseLabelsVisible = t, this.renderPhaseBars();
  }
  /**
   * Update with new data
   */
  update(t, e, s, n) {
    this.data = t, this.rowMapping = e, this.viewStart = s, this.viewMode = n, this.renderBars();
  }
  /**
   * Get bar by task ID
   */
  getBar(t) {
    return this.bars.get(t);
  }
  /**
   * Get all bars
   */
  getBars() {
    return this.bars;
  }
  /**
   * Highlight a specific bar
   */
  highlightBar(t) {
    this.bars.forEach((e, s) => {
      const n = e.getElement();
      n.style.opacity = t && s !== t ? "0.5" : "1";
    });
  }
  /**
   * Destroy manager and all bars
   */
  destroy() {
    this.clearBars(), this.clearPhaseBars();
  }
}
class nt {
  svg;
  headerGroup;
  bodyGroup;
  viewMode;
  viewStart;
  viewEnd;
  rowHeight;
  headerHeight;
  taskCount;
  barManager = null;
  data = null;
  rowMapping = null;
  constructor(t, e, s, n, i, o, c, a, h) {
    this.viewMode = e, this.viewStart = s, this.viewEnd = n, this.rowHeight = i, this.headerHeight = o, this.taskCount = c, this.data = a || null, this.rowMapping = h || null, this.svg = w("svg", {
      width: "100%",
      height: "100%",
      class: "gantt-svg"
    }), this.headerGroup = D({ class: "gantt-header" }), this.bodyGroup = D({ class: "gantt-body" }), this.svg.appendChild(this.headerGroup), this.svg.appendChild(this.bodyGroup), v(t), t.appendChild(this.svg), this.render(), this.data && this.rowMapping && this.renderBars();
  }
  /**
   * Render the complete grid
   */
  render() {
    v(this.bodyGroup), v(this.headerGroup);
    const t = P(this.viewMode), e = j(this.viewStart, this.viewEnd, this.viewMode);
    if (e.length === 0) {
      this.svg.setAttribute("width", "100%"), this.svg.setAttribute("height", `${this.headerHeight}px`);
      return;
    }
    const s = e.length * t.columnWidth, n = this.svg.parentElement?.clientWidth ?? s, i = s < n ? n / e.length : t.columnWidth, o = e.length * i, c = this.taskCount * this.rowHeight;
    this.svg.setAttribute("width", `${o}px`), this.svg.setAttribute("height", `${this.headerHeight + c}px`), this.renderGridBody(e, i, o, c), this.renderHeaders(e, i, o);
  }
  /**
   * Render task bars
   */
  renderBars() {
    !this.data || !this.rowMapping || (this.barManager = new rt(
      this.bodyGroup,
      this.data,
      this.rowMapping,
      this.viewStart,
      this.viewMode
    ));
  }
  renderGridBody(t, e, s, n) {
    const i = p({
      x: 0,
      y: this.headerHeight,
      width: s,
      height: n,
      fill: "#ffffff",
      class: "grid-background"
    });
    this.bodyGroup.appendChild(i);
    for (let o = 0; o <= this.taskCount; o++) {
      const c = this.headerHeight + o * this.rowHeight;
      this.bodyGroup.appendChild(M({ x1: 0, y1: c, x2: s, y2: c, class: "grid-row-line" }));
    }
    t.forEach((o, c) => {
      const a = c * e;
      this.bodyGroup.appendChild(M({ x1: a, y1: this.headerHeight, x2: a, y2: this.headerHeight + n, class: "grid-column-line" }));
    }), this.bodyGroup.appendChild(M({ x1: s, y1: this.headerHeight, x2: s, y2: this.headerHeight + n, class: "grid-column-line" }));
  }
  /**
   * Render date headers (upper and lower sections)
   */
  renderHeaders(t, e, s) {
    const n = this.headerHeight / 2, i = this.headerHeight / 2;
    this.headerGroup.appendChild(p({ x: 0, y: 0, width: s, height: this.headerHeight, class: "header-background" })), this.renderUpperHeader(t, e, n), this.renderLowerHeader(t, e, n, i), this.headerGroup.appendChild(M({ x1: 0, y1: this.headerHeight, x2: s, y2: this.headerHeight, class: "header-border" }));
  }
  /**
   * Render upper header section (grouped by larger time unit)
   */
  renderUpperHeader(t, e, s) {
    const i = P(this.viewMode).upperFormat, o = [];
    let c = "", a = 0, h = 0;
    t.forEach((d, l) => {
      const u = y(d.date, i);
      u !== c ? (h > 0 && o.push({
        label: c,
        start: a,
        width: h
      }), c = u, a = l * e, h = e) : h += e;
    }), h > 0 && o.push({
      label: c,
      start: a,
      width: h
    }), o.forEach((d) => {
      const l = p({
        x: d.start,
        y: 0,
        width: d.width,
        height: s,
        fill: "transparent",
        stroke: "#dee2e6",
        "stroke-width": 1,
        class: "upper-header-cell"
      });
      this.headerGroup.appendChild(l);
      const u = x(d.label, {
        x: d.start + d.width / 2,
        y: s / 2,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": 14,
        "font-weight": 600,
        fill: "#495057",
        class: "upper-header-text"
      });
      this.headerGroup.appendChild(u);
    });
  }
  /**
   * Render lower header section (individual dates)
   */
  renderLowerHeader(t, e, s, n) {
    t.forEach((i, o) => {
      const c = o * e, a = p({
        x: c,
        y: s,
        width: e,
        height: n,
        fill: "transparent",
        stroke: "#dee2e6",
        "stroke-width": 1,
        class: "lower-header-cell"
      });
      this.headerGroup.appendChild(a);
      const h = x(i.label, {
        x: c + e / 2,
        y: s + n / 2,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": 12,
        fill: "#6c757d",
        class: "lower-header-text"
      });
      this.headerGroup.appendChild(h);
    });
  }
  /**
   * Get the SVG element
   */
  getSVG() {
    return this.svg;
  }
  /**
   * Get the body group (where tasks will be rendered)
   */
  getBodyGroup() {
    return this.bodyGroup;
  }
  setViewMode(t) {
    this.viewMode = t, this.render(), this.barManager && this.data && this.rowMapping && this.barManager.updateViewMode(this.viewStart, t);
  }
  getBarManager() {
    return this.barManager;
  }
}
class it {
  container;
  data;
  rowMapping;
  config;
  constructor(t, e, s, n) {
    this.container = t, this.data = e, this.rowMapping = s, this.config = {
      showProgress: !0,
      showTaskCount: !0,
      ...n
    }, this.render();
  }
  /**
   * Render the complete phase panel
   */
  render() {
    this.container.innerHTML = "";
    const t = this.createHeader();
    this.container.appendChild(t), this.rowMapping.phases.forEach((e) => {
      const s = this.createPhaseBlock(e);
      this.container.appendChild(s);
    });
  }
  /**
   * Create header element
   */
  createHeader() {
    const t = document.createElement("div");
    return t.className = "phase-panel-header", t.style.cssText = `
      height: ${this.config.headerHeight}px;
      background: #f8f9fa;
      border-bottom: 2px solid #dee2e6;
      display: flex;
      align-items: center;
      padding: 0 16px;
      font-weight: 600;
      font-size: 14px;
      color: #495057;
    `, t.textContent = "Phases", t;
  }
  /**
   * Create phase block element
   */
  createPhaseBlock(t) {
    const e = document.createElement("div");
    e.className = "phase-block", e.dataset.phaseId = t.phase.id, e.style.cssText = `
      height: ${t.height}px;
      border-left: 4px solid ${t.phase.color};
      border-bottom: 1px solid #e9ecef;
      background: #f8f9fa;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    `;
    const s = document.createElement("div");
    s.className = "phase-name", s.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 4px;
    `, s.textContent = t.phase.name, e.appendChild(s);
    const n = document.createElement("div");
    if (n.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: #6c757d;
    `, this.config.showTaskCount) {
      const i = document.createElement("span");
      i.textContent = `${t.tasks.length} task${t.tasks.length !== 1 ? "s" : ""}`, n.appendChild(i);
    }
    if (this.config.showProgress && t.averageProgress > 0) {
      const i = document.createElement("span");
      i.style.cssText = `
        padding: 2px 8px;
        background: ${t.averageProgress === 100 ? "#28a745" : "#007bff"};
        color: white;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
      `, i.textContent = `${t.averageProgress}%`, n.appendChild(i);
    }
    if (e.appendChild(n), this.config.showProgress && t.averageProgress > 0) {
      const i = document.createElement("div");
      i.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: ${t.averageProgress}%;
        background: ${t.phase.color};
        opacity: 0.6;
        transition: width 0.3s ease;
      `, e.appendChild(i);
    }
    return e;
  }
  /**
   * Update with new data
   */
  update(t, e) {
    this.data = t, this.rowMapping = e, this.render();
  }
  /**
   * Highlight a specific phase
   */
  highlightPhase(t) {
    if (this.container.querySelectorAll(".phase-block").forEach((s) => {
      s.style.background = "#f8f9fa";
    }), t) {
      const s = this.container.querySelector(`[data-phase-id="${t}"]`);
      s && (s.style.background = "#e3f2fd");
    }
  }
  /**
   * Get row mapping (for external use)
   */
  getRowMapping() {
    return this.rowMapping;
  }
}
class Ht {
  data;
  container;
  config;
  viewStart = /* @__PURE__ */ new Date();
  viewEnd = /* @__PURE__ */ new Date();
  grid = null;
  phasePanel = null;
  rowMapping = null;
  phasePanelElement = null;
  ganttMain = null;
  scrollSyncInitialized = !1;
  constructor(t, e) {
    if (this.data = t, typeof e.container == "string") {
      const s = document.querySelector(e.container);
      if (!s)
        throw new Error(`Container not found: ${e.container}`);
      this.container = s;
    } else
      this.container = e.container;
    this.config = {
      ...V,
      ...e,
      container: this.container
    }, this.calculateDateRange(), this.rowMapping = B(
      this.data,
      this.config.rowHeight,
      this.config.headerHeight
    ), console.log("GanttChart initialized with", this.data.tasks.length, "tasks"), console.log("Date range:", y(this.viewStart, "YYYY-MM-DD"), "to", y(this.viewEnd, "YYYY-MM-DD")), console.log("View mode:", this.config.viewMode), console.log("Row mapping:", this.rowMapping.totalRows, "rows"), this.render();
  }
  /**
   * Calculate the date range from all tasks
   */
  calculateDateRange() {
    if (this.data.tasks.length === 0) {
      const i = /* @__PURE__ */ new Date();
      this.viewStart = new Date(i.getFullYear(), i.getMonth(), 1), this.viewEnd = new Date(i.getFullYear(), i.getMonth() + 1, 0);
      return;
    }
    const t = this.data.tasks.flatMap((i) => [
      f(i.start),
      f(i.end)
    ]), e = F(...t), s = R(...t), n = this.config.padding[this.config.viewMode];
    if (!n) {
      this.viewStart = g(e, -1, "month"), this.viewEnd = g(s, 1, "month");
      return;
    }
    this.viewStart = g(e, -n.amount, n.unit), this.viewEnd = g(s, n.amount, n.unit);
  }
  /**
   * Main render method
   */
  render() {
    if (this.phasePanelElement = this.container.querySelector("#phase-panel"), this.ganttMain = this.container.querySelector("#gantt-main"), !this.phasePanelElement || !this.ganttMain) {
      console.error("Required elements not found. Make sure #phase-panel and #gantt-main exist.");
      return;
    }
    this.scrollSyncInitialized || (this.setupScrollSync(), this.scrollSyncInitialized = !0), this.renderPhasePanel(), this.renderGrid();
  }
  setupScrollSync() {
    if (!this.ganttMain || !this.phasePanelElement) return;
    const t = this.ganttMain, e = this.phasePanelElement;
    t.addEventListener("scroll", () => {
      e.scrollTop !== t.scrollTop && (e.scrollTop = t.scrollTop);
    }), e.addEventListener("scroll", () => {
      t.scrollTop !== e.scrollTop && (t.scrollTop = e.scrollTop);
    });
  }
  /**
   * Render the enhanced phase panel
   */
  renderPhasePanel() {
    !this.phasePanelElement || !this.rowMapping || (this.phasePanel = new it(
      this.phasePanelElement,
      this.data,
      this.rowMapping,
      {
        headerHeight: this.config.headerHeight,
        showProgress: !0,
        showTaskCount: !0
      }
    ));
  }
  /**
   * Render the SVG grid with task bars
   */
  renderGrid() {
    !this.ganttMain || !this.rowMapping || (this.grid = new nt(
      this.ganttMain,
      this.config.viewMode,
      this.viewStart,
      this.viewEnd,
      this.config.rowHeight,
      this.config.headerHeight,
      this.data.tasks.length,
      this.data,
      this.rowMapping
    ));
  }
  /**
   * Change view mode
   */
  setViewMode(t) {
    this.config.viewMode = t, this.calculateDateRange(), this.renderGrid(), this.config.onViewChange && this.config.onViewChange(t), console.log("View mode changed to:", t);
  }
  /**
   * Refresh the chart with new data
   */
  refresh(t) {
    this.data = t, this.calculateDateRange(), this.rowMapping = B(
      this.data,
      this.config.rowHeight,
      this.config.headerHeight
    ), this.render();
  }
  /**
   * Get current view mode
   */
  getViewMode() {
    return this.config.viewMode;
  }
  /**
   * Get row mapping (for bar positioning in Sprint 5)
   */
  getRowMapping() {
    return this.rowMapping;
  }
  /**
   * Get phase panel component
   */
  getPhasePanel() {
    return this.phasePanel;
  }
  /**
   * Get bar manager
   */
  getBarManager() {
    return this.grid?.getBarManager();
  }
  /**
   * Highlight a specific phase
   */
  highlightPhase(t) {
    this.phasePanel && this.phasePanel.highlightPhase(t);
  }
}
export {
  et as Bar,
  rt as BarManager,
  A as DEFAULT_BAR_CONFIG,
  V as DEFAULT_OPTIONS,
  yt as DEFAULT_PHASE_BAR_CONFIG,
  Ht as GanttChart,
  it as PhasePanel,
  E as VIEW_MODE_CONFIGS,
  g as add,
  ut as addDuration,
  Y as calculateBarDimensions,
  $ as calculatePhaseBarDimensions,
  X as calculateProgressWidth,
  vt as clamp,
  v as clearElement,
  bt as clone,
  D as createGroup,
  M as createLine,
  Dt as createPath,
  p as createRect,
  B as createRowMapping,
  w as createSVGElement,
  x as createText,
  U as diff,
  Et as distance,
  lt as endOf,
  y as format,
  j as generateDateHeaders,
  Ct as generateId,
  Q as getContrastTextColor,
  kt as getDateForPosition,
  dt as getDurationInDays,
  Pt as getEventCoordinates,
  Bt as getPhaseForTask,
  Yt as getPhaseInfo,
  k as getPositionForDate,
  L as getTaskRow,
  $t as getTaskRowByIndex,
  P as getViewConfig,
  ft as isAfter,
  xt as isBarVisible,
  pt as isBefore,
  wt as isSameDay,
  ht as isValidDate,
  mt as isWithinRange,
  at as loadGanttData,
  R as max,
  F as min,
  f as parse,
  G as parseDuration,
  St as pointInRect,
  Z as setAttributes,
  T as startOf,
  q as subtract,
  gt as subtractDuration,
  ct as toISODate,
  Mt as today,
  N as truncateLabel,
  ot as validateGanttData
};
