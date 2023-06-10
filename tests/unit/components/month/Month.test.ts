import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Month from "../../../../src/components/month/Month.vue";
import Time, { WEEK_START_DAY } from "../../../../src/helpers/Time";
import { nextTick } from "vue";

describe("Month.vue", () => {
  let wrapper = mount(Month, {
    props: {
      eventsProp: [],

      time: new Time(WEEK_START_DAY.MONDAY, "de-DE"),
      config: {
        month: {
          showTrailingAndLeadingDates: false,
          isSmall: true,
        }
      },
      period: {
        start: new Date(2023, 3 - 1, 1),
        end: new Date(2023, 3 - 1, 31),
        selectedDate: new Date(2023, 3 - 1, 23),
      },
    },
  });

  test("given a month, display the correct number of weeks and days", async () => {
    wrapper.vm.setMonth();
    await nextTick();

    const expectedCalendarWeeksCount = 5;
    const calendarWeeks = wrapper.findAll(".calendar-month__week");
    expect(calendarWeeks).toHaveLength(expectedCalendarWeeksCount);
    const calendarWeekdays = wrapper.findAll(".calendar-month__weekday");
    expect(calendarWeekdays).toHaveLength(31);
  });

  test("showing space reservers when hiding trailing and leading months", async () => {
    wrapper.vm.setMonth();
    await nextTick();
    const trailingAndLeadingDays = wrapper.findAll(".space-reserver");
    expect(trailingAndLeadingDays).toHaveLength(4);
  });

  test("showing trailing and leading days by config option", async () => {
    wrapper = mount(Month, {
      props: {
        eventsProp: [],

        time: new Time("monday", "de-DE"),
        config: {
          isSmall: true,
          month: {
            showTrailingAndLeadingDates: true,
          }
        },
        period: {
          start: new Date(2023, 3 - 1, 1),
          end: new Date(2023, 3 - 1, 31),
          selectedDate: new Date(2023, 3 - 1, 23),
        },
      },
    });

    wrapper.vm.setMonth();
    await nextTick();
    const trailingAndLeadingDays = wrapper.findAll(".trailing-or-leading");
    expect(trailingAndLeadingDays).toHaveLength(4);
  })

  test('showing trailing and leading days by omitting month config', async () => {
    wrapper = mount(Month, {
      props: {
        eventsProp: [],

        time: new Time(WEEK_START_DAY.MONDAY, "de-DE"),
        config: {
          isSmall: true,
        },
        period: {
          start: new Date(2023, 3 - 1, 1),
          end: new Date(2023, 3 - 1, 31),
          selectedDate: new Date(2023, 3 - 1, 23),
        },
      },
    });

    wrapper.vm.setMonth();
    await nextTick();
    const trailingAndLeadingDays = wrapper.findAll(".trailing-or-leading");
    expect(trailingAndLeadingDays).toHaveLength(4);
  })

  test('showing AgendaEvents child component upon mounting', async () => {
    const agendaEvents = wrapper.findComponent({ name: "AgendaEvents" });
    expect(agendaEvents.exists()).toBe(true);
  });
});
