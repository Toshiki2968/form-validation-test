// MyForm.tsx
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

// Valibotのスキーマ定義
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "名前は必須です")),
  age: v.pipe(
    v.number("年齢は必須です"),
    v.minValue(10, "10歳以上を入力してください"),
    v.maxValue(20, "20歳以下を入力してください")
  ),
});

// 入力データの型
type FormData = {
  name: string;
  age: number;
};

const ValibotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("送信成功:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label>名前：</label>
        <br />
        <input {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>年齢：</label>
        <br />
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>

      <button type="submit">送信</button>
    </form>
  );
};

export default ValibotForm;
