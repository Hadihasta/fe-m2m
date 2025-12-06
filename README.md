# Frontend Developer Quiz – Email Recipients Cell

## 🛠️ Setup Project

```bash
# Install dependencies
pnpm install   # or npm install / yarn install
```

```bash
# Run dev server
pnpm dev       # default: http://localhost:5173
```

---

## 📂 Relevant Structure

```bash
src/
 └─ components/
     └─ quiz/
         ├─ EmailCellUnsolved.tsx   # starter component (unsolved)
         ├─ EmailCellQuiz.tsx       # interactive harness (with slider)
         └─ quiz.css                # base styling
         └─ EmailCell.css           # My solution
         └─ EmailtCell.test.tsx     # unit testing for component emailcell component
```

---

## ✅ Evaluation Checklist

- [ ] The cell renders emails based on available width.
- [ ] **Single + Badge Mode** works (truncate first email if too long).
- [ ] **Multi-Fit Mode** works (≥2 emails shown fully, no truncation).
- [ ] Badge shows remaining email count.
- [ ] Tooltip shows complete email list on hover.
- [ ] Separator between emails is `", "`.
- [ ] Responsive to column resizing (via slider in quiz).
- [ ] Handles empty email list gracefully.
- [ ] Basic accessibility is present (`aria-label` / `title`).
- [ ] Code is clean, structured, and type-safe.

---

## 🔍 How to Test

1. Run `pnpm dev`.
2. Open the main page → you will see a table with multiple email scenarios.
3. Use the **slider** to adjust the width of the "Recipients" column.
4. Verify all challenge rules across different scenarios.

---

## 💡 Notes

- Do **not** use external UI libraries or ready-made tooltip/badge components.
- Use **React + pure CSS only**.
- Do not hardcode breakpoints. Solution must be **measurement-based** (text/element width).
- Bonus points for short explanatory comments in code or simple unit tests.


===================================================================================================================================


React testing library & vitest
testing command  :
npx vitest