import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { HeaderBlock, ProgressBar, Screen, SurfaceCard, AppButton } from "../components/Ui";
import { palette, spacing } from "../theme";
import { getGoals, createGoal, deleteGoal, updateGoal } from "../services/api";
import { goalDTO } from "../models/IGoals";

export function GoalsScreen() {
  const [goals, setGoals] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [editingGoal, setEditingGoal] = useState<any | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editMontoObjetivo, setEditMontoObjetivo] = useState("");
  const [editMontoActual, setEditMontoActual] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      console.error("Error cargando metas:", err);
    }
  };

  const handleAddGoal = async () => {
    const montoObjetivo = parseFloat(monto);

    let model = {
      nombre: nombre,
      descripcion: "",
      montoObjetivo: montoObjetivo,
      montoActual: 0,
      fechaLimite: new Date()
    };

    try {
      const nueva = await createGoal(model);
      setGoals([...goals, nueva]);
      setNombre("");
      setMonto("");
    } catch (err) {
      console.error("Error creando meta:", err);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Error eliminando meta:", err);
    }
  };

  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
    setEditNombre(goal.nombre);
    setEditMontoObjetivo(goal.montoObjetivo.toString());
    setEditMontoActual(goal.montoActual.toString());
  };

  const handleSaveEdit = async () => {
    if (!editingGoal) return;
    try {
      const updated = {
        ...editingGoal,
        nombre: editNombre,
        montoObjetivo: parseFloat(editMontoObjetivo),
        montoActual: parseFloat(editMontoActual),
      };
      await updateGoal(editingGoal.id, updated);
      setEditingGoal(null); // cerrar edición
      loadGoals();
    } catch (err) {
      console.error("Error editando meta:", err);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Savings goals"
          title="Metas activas con avance visible"
          body="Un espacio para separar ahorro operativo del ahorro con destino, usando tarjetas claras y progreso directo."
        />

        {/* Inputs para crear nueva meta */}
        <SurfaceCard>
          <TextInput
            placeholder="Nombre de la meta"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <TextInput
            placeholder="Monto objetivo"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
            style={styles.input}
          />
          <AppButton label="Agregar meta" onPress={handleAddGoal} />
        </SurfaceCard>

        {/* Lista de metas */}
        {goals.map((goal, index) => (
  <SurfaceCard key={goal.id}>
    <Text style={styles.name}>{goal.nombre}</Text>
    <Text style={styles.saved}>Guardado: {goal.montoActual}</Text>
    <Text style={styles.target}>Objetivo: {goal.montoObjetivo}</Text>
    <ProgressBar
      value={goal.montoActual / goal.montoObjetivo}
      color={index === 0 ? palette.accent : index === 1 ? palette.coral : palette.gold}
    />
    <AppButton label="Editar" onPress={() => handleEditGoal(goal)} />
    <AppButton label="Eliminar" onPress={() => handleDeleteGoal(goal.id)} variant="secondary" />

    {/* Formulario de edición dentro de la misma meta */}
    {editingGoal?.id === goal.id && (
      <View style={{ marginTop: spacing.md }}>
        <TextInput
          placeholder="Nuevo nombre"
          value={editNombre}
          onChangeText={setEditNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Nuevo monto objetivo"
          value={editMontoObjetivo}
          onChangeText={setEditMontoObjetivo}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Monto guardado"
          value={editMontoActual}
          onChangeText={setEditMontoActual}
          keyboardType="numeric"
          style={styles.input}
        />
        <AppButton label="Guardar cambios" onPress={handleSaveEdit} />
        <AppButton label="Cancelar" onPress={() => setEditingGoal(null)} variant="secondary" />
      </View>
    )}
  </SurfaceCard>
))}

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: { gap: spacing.lg },
  input: {
    borderWidth: 1,
    borderColor: palette.inkSoft,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: 6,
  },
  name: { color: palette.ink, fontWeight: "800", fontSize: 18 },
  saved: { color: palette.accent, fontWeight: "900", fontSize: 28 },
  target: { color: palette.inkSoft },
});
