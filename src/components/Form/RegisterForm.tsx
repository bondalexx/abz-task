import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePositions } from "../../hooks/usePositions";
import { useRegister } from "../../hooks/useRegister";
import { ensureImageConstraints } from "../utils/image";
import { formatPhoneDisplay, toApiPhone } from "../utils/phone";
import styles from "./Form.module.scss";
import type { RegisterPayload } from "../../types/api";

const schema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().min(6),
  position_id: z.number().int(),
  photo: z
    .instanceof(File, { message: "Please choose a JPG/JPEG file" })
    .refine(
      (f) => ["image/jpeg", "image/jpg"].includes(f.type),
      "Only JPEG/JPG is allowed"
    )
    .refine((f) => f.size <= 5 * 1024 * 1024, "Max size is 5MB"),
});
type FormValues = z.infer<typeof schema>;

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { data: positions } = usePositions();
  const registerMutation = useRegister();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "+38" },
  });

  const selectedFile = watch("photo") as unknown as File | undefined;

  const onSubmit = async (values: FormValues): Promise<void> => {
    const apiPhone = toApiPhone(values.phone);
    if (!/^\+380\d{9}$/.test(apiPhone)) {
      setError("phone", {
        type: "validate",
        message: "Phone must be +380XXXXXXXXX",
      });
      return;
    }

    try {
      const res = await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        phone: toApiPhone(values.phone),
        position_id: values.position_id,
        photo: values.photo,
      } as RegisterPayload);

      if (res.success) {
        onSuccess();
        reset({ phone: "+38" });
      } else {
        alert(res.message);
      }
    } catch (e: any) {
      const fails = e?.response?.data?.fails as
        | Record<string, string[]>
        | undefined;
      if (fails) {
        Object.entries(fails).forEach(([k, v]) =>
          setError(k as keyof FormValues, {
            type: "server",
            message: v[0],
          })
        );
      }
      alert(e?.response?.data?.message ?? "Registration failed");
    }

    const ok = await ensureImageConstraints(values.photo, {
      minWidth: 70,
      minHeight: 70,
    });
    if (!ok) {
      setError("photo", {
        type: "validate",
        message: "Minimum 70x70px required",
      });
      return;
    }
  };

  return (
    <section className={styles.wrap} id="register">
      <h2 className={styles.title}>Working with POST request</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>

        <div className={styles.field} style={{ marginBottom: 25 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                className={styles.input}
                placeholder="Phone"
                value={field.value}
                onChange={(e) =>
                  field.onChange(formatPhoneDisplay(e.target.value))
                }
                onBlur={(e) =>
                  field.onChange(formatPhoneDisplay(e.target.value))
                }
              />
            )}
          />
          <div className={styles.hint}>+38 (XXX) XXX - XX - XX</div>
          {errors.phone && (
            <div className={styles.error}>{errors.phone.message}</div>
          )}
        </div>

        <fieldset className={styles.field}>
          <legend className={styles.legend}>Select your position</legend>
          {positions?.positions?.map((p) => (
            <label key={p.id} className={styles.radio}>
              <input
                type="radio"
                value={p.id}
                {...register("position_id", { valueAsNumber: true })}
              />
              {p.name}
            </label>
          ))}
          {errors.position_id && (
            <div className={styles.error}>{errors.position_id.message}</div>
          )}
        </fieldset>

        <div className={styles.field}>
          <div className={styles.fileRow}>
            <label
              htmlFor="photoInput"
              className={styles.fileBtn}
              style={{ cursor: "pointer" }}
            >
              Upload
            </label>
            <div className={styles.fileFake}>
              {selectedFile ? selectedFile.name : "Upload your photo"}
            </div>
          </div>

          <input
            id="photoInput"
            type="file"
            accept="image/jpeg,image/jpg"
            className={styles.hiddenFile}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setValue("photo", f, { shouldValidate: true });
            }}
          />

          {errors.photo && (
            <div className={styles.error}>{errors.photo.message}</div>
          )}
          <div className={styles.hint}>JPEG/JPG, ≥ 70×70px, ≤ 5MB</div>
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          Sign up
        </button>
      </form>
    </section>
  );
}
