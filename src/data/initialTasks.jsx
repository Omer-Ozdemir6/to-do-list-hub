
export const initialTasks = [
  {
    id: 1,
    title: 'Karakter Kontrolleri ve Hareket Mekaniği',
    description:
      "Temel koşma ve zıplama kontrollerinin Unity/Unreal Engine'de ayarlanması.",
    isCompleted: false,
    subtasks: [
      { id: 101, text: 'Koşma hızını test et', isCompleted: true },
      { id: 102, text: "Animasyon state'lerini bağla", isCompleted: false },
    ],
  },
  {
    id: 2,
    title: 'Kullanıcı Arayüzü (UI) Taslağı',
    description:
      'Sağlık çubuğu ve skor göstergesinin ekranın üst köşesine yerleştirilmesi.',
    isCompleted: false,
    subtasks: [],
  },
];
