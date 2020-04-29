export interface SettingsObject {
  selectedWeekLeave: string;
  selectedWeekdayLeave: string;
  selectedWeekFetch: string;
  selectedWeekdayFetch: string;
}

export class SettingsHelper {
  public static weekdayOptions: string[] = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];
  public static weekLeaveOptions: string[] = ["jämna", "udda"];
  public static weekFetchOptions: string[] = ["efterföljande", "samma"];
  private static defaultWeekdayLeave = "Torsdag";
  private static defaultWeekLeave = "jämna";
  private static defaultWeekdayFetch = "Torsdag";
  private static defaultWeekFetch = "efterföljande";

  public static getDefaultSettings(): SettingsObject {
    return {
      selectedWeekdayLeave: this.defaultWeekdayLeave,
      selectedWeekLeave: this.defaultWeekLeave,
      selectedWeekdayFetch: this.defaultWeekdayFetch,
      selectedWeekFetch: this.defaultWeekFetch,
    };
  }

  public static getSettings(): SettingsObject {
    const newSettings = this.getDefaultSettings();
    const candidateSettingsRaw = localStorage.getItem("appSettings");
    if (!candidateSettingsRaw) return newSettings;
    else return JSON.parse(candidateSettingsRaw);
  }

  public static storeSettings(settings: SettingsObject) {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }
}
