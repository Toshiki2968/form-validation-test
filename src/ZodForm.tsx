// MyForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zodのスキーマ定義
const schema = z.object({
  name: z.string().min(1, "名前は必須です"),
  age: z
    .number({ required_error: "年齢は必須です" })
    .min(10, "10歳以上を入力してください")
    .max(20, "20歳以下を入力してください"),
});

// Zodから型を推論
type FormData = z.infer<typeof schema>;

const ZodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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

export default ZodForm;
