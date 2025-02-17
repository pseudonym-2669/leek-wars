<template lang="html">
	<div class="effect" @click="LeekWars.effectRawOpened = !LeekWars.effectRawOpened">
		<tooltip v-if="icon" content-class="fluid">
			<template v-slot:activator="{ on }">
				<img class="icon" :src="'/image/charac/small/' + icon + '.png'" v-on="on">
			</template>
			<i18n path="effect.increased_by">
				<b slot="charac">{{ $t('characteristic.' + icon) }}</b>
			</i18n>
			<div>
				{{ charac }} {{ $t('characteristic.' + icon) }} :
				<span v-if="Math.round(effect.value1 * boost) == Math.round((effect.value1 + effect.value2) * boost)" v-html="$t('effect.type_' + effect.id + '_fixed', [Math.round(effect.value1 * boost)])"></span>
				<span v-else v-html="$t('effect.type_' + effect.id, [Math.round(effect.value1 * boost), Math.round((effect.value1 + effect.value2) * boost)])"></span>
			</div>
		</tooltip>

		<span v-if="passive">{{ $t('effect.passive') }}</span>
		<i18n v-if="effect.id == 14" path="effect.type_14_fixed">
			<b slot="summon">{{ $t('effect.summon_' + effect.value1) }}</b>
		</i18n>
		<span v-else-if="effect.value2 == 0" v-html="$t('effect.type_' + effect.id + '_fixed', [format(effect.value1)])"></span>
		<span v-else v-html="$t('effect.type_' + effect.id, [format(effect.value1), format(effect.value1 + effect.value2)])"></span>
		<span v-if="effect.modifiers & EffectModifier.ON_CASTER">
			<span v-if="effectThe">
				{{ $t('effect.the_caster') }}
			</span>
			<span v-else>
				{{ $t('effect.to_the_caster') }}
			</span>
		</span>
		<b v-if="effect.modifiers & EffectModifier.MULTIPLIED_BY_TARGETS">&nbsp;{{ $t('effect.multiplied_target') }}</b>

		<b v-if="effect.turns === -1">{{ $t('effect.infinite') }}</b>
		<i18n v-else-if="effect.turns > 0" path="effect.on_n_turns">
			<span slot="turns" v-html="$tc('effect.n_turns', effect.turns)"></span>
		</i18n>
		<span v-if="effect.modifiers & EffectModifier.STACKABLE">
			(<b>{{ $t('effect.stackable') }}</b>)
		</span>
		<span v-if="effect.modifiers & EffectModifier.NOT_REPLACEABLE">
			(<b>{{ $t('effect.not_replaceable') }}</b>)
		</span>
		<span v-if="effect.modifiers & EffectModifier.IRREDUCTIBLE">
			(<b>{{ $t('effect.irreductible') }}</b>)
		</span>

		<tooltip v-if="enemies && !allies">
			<template v-slot:activator="{ on }">
				<span class="ennemies" v-on="on" />
			</template>
			<span>{{ $t('effect.target_enemies') }}</span>
		</tooltip>

		<span>
			<tooltip v-if="allies && !enemies">
				<template v-slot:activator="{ on }">
					<span class="allies" v-on="on"></span>
				</template>
				<span>{{ $t('effect.target_allies') }}</span>
			</tooltip>
		</span>

		<span>
			<tooltip v-if="!caster">
				<template v-slot:activator="{ on }">
					<span class="not-player" v-on="on"></span>
				</template>
				<span>{{ $t('effect.target_not_player') }}</span>
			</tooltip>
		</span>

		<span>
			<tooltip v-if="!nonSummons">
				<template v-slot:activator="{ on }">
					<span class="summons" v-on="on"></span>
				</template>
				<span>{{ $t('effect.target_summons') }}</span>
			</tooltip>
		</span>

		<span>
			<tooltip v-if="!summons">
				<template v-slot:activator="{ on }">
					<span class="not-summons" v-on="on"></span>
				</template>
				<span>{{ $t('effect.target_not_summons') }}</span>
			</tooltip>
		</span>

		<lw-code v-if="LeekWars.effectRawOpened" :single="true" :code="'[' + effect.id + ' ' + EffectType[effect.id] + ', ' + format(effect.value1) + ', ' + format(effect.value1 + effect.value2) + ', ' + effect.turns + ', ' + effect.targets + ', ' + effect.modifiers + ']'" class="raw" />
	</div>
</template>

<script lang="ts">
	import { Effect, EffectModifier, EffectType } from '@/model/effect'
	import { LeekWars } from '@/model/leekwars'
	import { store } from '@/model/store'
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component({ name: 'effect-view' })
	export default class EffectView extends Vue {
		@Prop() effect!: Effect
		@Prop() passive!: boolean
		EffectModifier = EffectModifier
		EffectType = EffectType
		raw_opened: boolean = false
		get enemies() { return this.effect.targets & 1 }
		get allies(): boolean { return (this.effect.targets & (1 << 1)) !== 0 }
		get caster(): boolean { return (this.effect.targets & (1 << 2)) !== 0 }
		get nonSummons(): boolean { return (this.effect.targets & (1 << 3)) !== 0 }
		get summons(): boolean { return (this.effect.targets & (1 << 4)) !== 0 }
		get effectThe(): boolean {
			return this.effect.id === EffectType.HEAL
		}
		format(n: number) {
			if (Math.floor(n) !== n) {
				return n.toFixed(2)
			}
			return n
		}
		get icon() {
			if ([EffectType.DAMAGE].includes(this.effect.id)) { return 'strength' }
			if ([EffectType.LIFE_DAMAGE].includes(this.effect.id)) { return 'life' }
			if ([EffectType.HEAL, EffectType.BOOST_MAX_LIFE].includes(this.effect.id)) { return 'wisdom' }
			if ([EffectType.ABSOLUTE_SHIELD, EffectType.RELATIVE_SHIELD].includes(this.effect.id)) { return 'resistance' }
			if ([EffectType.DAMAGE_RETURN].includes(this.effect.id)) { return 'agility' }
			if ([EffectType.BUFF_STRENGTH, EffectType.BUFF_RESISTANCE, EffectType.BUFF_WISDOM, EffectType.BUFF_AGILITY, EffectType.BUFF_MP, EffectType.BUFF_TP, EffectType.AFTEREFFECT, EffectType.NOVA_DAMAGE, EffectType.NOVA_VITALITY].includes(this.effect.id)) { return 'science' }
			if ([EffectType.POISON, EffectType.SHACKLE_MP, EffectType.SHACKLE_TP, EffectType.SHACKLE_STRENGTH, EffectType.SHACKLE_MAGIC, EffectType.SHACKLE_AGILITY, EffectType.SHACKLE_WISDOM].includes(this.effect.id)) { return 'magic' }
		}

		get my_leek() {
			return LeekWars.first(store.state.farmer!.leeks)!
		}
		get charac() {
			return this.icon ? this.my_leek[this.icon] : 0
		}
		get boost() {
			if (this.icon === 'life') {
				return this.charac / 100
			} else {
				return 1 + this.charac / 100
			}
		}
	}
</script>

<style lang="scss" scoped>
	div img.icon {
		width: 16px;
		margin-bottom: 1px;
	}
	.effect {
		cursor: pointer;
	}
	.raw {
		font-size: 13px;
		padding: 4px 0;
		display: block;
		border: none;
	}
</style>