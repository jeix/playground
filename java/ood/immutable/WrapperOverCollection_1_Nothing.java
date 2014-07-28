package ood.immutable;

import java.util.ArrayList;
import java.util.List;

public class WrapperOverCollection_1_Nothing {
	
	static class ChangeOverview {
		private BizRuleSet ruleset;
		public void setRuleset(BizRuleSet ruleset) {
			this.ruleset = ruleset;
		}
		public BizRuleSet getRuleset() {
			return ruleset;
		}
	}
	static class BizRuleSet {
		private List<BizRuleType> majors = new ArrayList<BizRuleType>();
		public void setMajors(List<BizRuleType> majors) {
			this.majors = majors;
		}
		public List<BizRuleType> getMajors() {
			return this.majors;
		}
		private List<BizRuleType> recents = new ArrayList<BizRuleType>();
		public void setRecents(List<BizRuleType> recents) {
			this.recents = recents;
		}
		public List<BizRuleType> getRecents() {
			return this.recents;
		}
		private List<BizRuleGroup> others = new ArrayList<BizRuleGroup>();
		public void setOthers(List<BizRuleGroup> others) {
			this.others = others;
		}
		public List<BizRuleGroup> getOthers() {
			return this.others;
		}
	}
	static class BizRuleGroup {
		private String code;
		private String name;
		public BizRuleGroup(String code, String name) {
			this.code = code;
			this.name = name;
		}
		public String getCode() {
			return this.code;
		}
		public String getName() {
			return this.name;
		}
		private List<BizRuleType> types = new ArrayList<BizRuleType>();
		public void setTypes(List<BizRuleType> types) {
			this.types = types;
		}
		public List<BizRuleType> getTypes() {
			return this.types;
		}
	}
	static class BizRuleType {
		private String code;
		private String name;
		public BizRuleType(String code, String name) {
			this.code = code;
			this.name = name;
		}
		public String getCode() {
			return this.code;
		}
		public String getName() {
			return this.name;
		}
		private boolean selected;
		public void markAsSelected() {
			this.selected = true;
		}
		public boolean getSelected() {
			return this.selected;
		}
	}
	
	static class BizRuleSetBuilder {
		public static BizRuleSet build() {
			BizRuleSet set = new BizRuleSet();
			List<BizRuleType> majors = set.getMajors();
			majors.add(new BizRuleType("D001", "주요유형_1"));
			majors.add(new BizRuleType("D002", "주요유형_2"));
			majors.add(new BizRuleType("D003", "주요유형_3"));
			majors.add(new BizRuleType("D004", "주요유형_4"));
			List<BizRuleType> recents = set.getRecents();
			recents.add(new BizRuleType("D901", "최신유형_1"));
			recents.add(new BizRuleType("D902", "최신유형_2"));
			recents.add(new BizRuleType("D903", "최신유형_3"));
			recents.add(new BizRuleType("D904", "최신유형_4"));
			List<BizRuleGroup> others = set.getOthers();
			BizRuleGroup other_1 = new BizRuleGroup("01", "그룹_1");
			List<BizRuleType> types_1 = other_1.getTypes();
			types_1.add(new BizRuleType("D101", "그룹_1_유형_1"));
			types_1.add(new BizRuleType("D102", "그룹_1_유형_2"));
			types_1.add(new BizRuleType("D103", "그룹_1_유형_3"));
			types_1.add(new BizRuleType("D104", "그룹_1_유형_4"));
			types_1.get(2).markAsSelected();
			others.add(other_1);
			BizRuleGroup other_2 = new BizRuleGroup("02", "그룹_2");
			List<BizRuleType> types_2 = other_2.getTypes();
			types_2.add(new BizRuleType("D201", "그룹_2_유형_1"));
			types_2.add(new BizRuleType("D202", "그룹_2_유형_2"));
			types_2.add(new BizRuleType("D203", "그룹_2_유형_3"));
			types_2.add(new BizRuleType("D204", "그룹_2_유형_4"));
			others.add(other_2);
			BizRuleGroup other_3 = new BizRuleGroup("03", "그룹_3");
			List<BizRuleType> types_3 = other_3.getTypes();
			types_3.add(new BizRuleType("D301", "그룹_3_유형_1"));
			types_3.add(new BizRuleType("D302", "그룹_3_유형_2"));
			types_3.add(new BizRuleType("D303", "그룹_3_유형_3"));
			types_3.add(new BizRuleType("D304", "그룹_3_유형_4"));
			others.add(other_3);
			deep_dive(set);
			return set;
		}
	}
	
	private static List<String> ofp = new ArrayList<String>(); // original finger prints
	private static void deep_dive(BizRuleSet ruleset) {
		List<String> fp = new ArrayList<String>(); // finger prints
		fp.add(ruleset.toString());
		for (BizRuleType major : ruleset.majors) {
			fp.add(major.toString());
		}
		for (BizRuleType recent : ruleset.recents) {
			fp.add(recent.toString());
		}
		for (BizRuleGroup other : ruleset.others) {
			fp.add(other.toString());
			for (BizRuleType type : other.types) {
				fp.add(type.toString());
			}
		}
		if (ofp.size() == 0) {
			ofp = fp;
		} else {
			for (int i = 0; i < ofp.size(); i++) {
				if (! ofp.get(i).equals(fp.get(i))) {
					System.out.println("diff");
					break;
				}
			}
			System.out.println(":wq");
		}
	}
	
	public static void main(String[] args) {
		// "Play at Your Own Risk" version
		ChangeOverview overview = new ChangeOverview();
		overview.setRuleset(BizRuleSetBuilder.build());
		BizRuleSet ruleset = overview.getRuleset();
		deep_dive(ruleset);
	}
}