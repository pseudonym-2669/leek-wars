<template>
	<router-link v-if="notification" v-ripple :to="link" :notif="notification.id" :type="notification.type" :class="{unread: !notification.read, [notification.clazz]: notification.clazz }" class="notification" @click.native="click">
		<v-icon v-if="notification.icon" class="image">{{ notification.image }}</v-icon>
		<img v-else :src="'/image/' + notification.image" class="image">
		<div class="content">
			<div class="title" v-html="$t('notification.title_' + notification.type, notification.title)"></div>
			<div class="message">{{ $t('notification.message_' + notification.type, notification.message) }}</div>
		</div>
		<div class="spacer"></div>
		<span class="date">{{ LeekWars.formatDuration(notification.date) }}</span>
		<span v-if="resultIcon && LeekWars.notifsResults" class="result">
			<v-icon :class="resultIcon">{{ resultIcon }}</v-icon>
		</span>
		<v-icon v-if="notification.clazz === 'notif-bigwin'" class="large-icon">mdi-crown</v-icon>
		<v-icon v-else-if="notification.clazz === 'notif-trophy'" class="large-icon">mdi-trophy</v-icon>
	</router-link>
</template>

<script lang="ts">
	import { LeekWars } from '@/model/leekwars'
	import { Notification, NotificationType } from '@/model/notification'
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component({ name: 'notification' })
	export default class NotificationElement extends Vue {
		@Prop({ required: true }) notification!: Notification

		get link() { return this.notification.link ? this.notification.link : '' }
		get resultIcon() {
			return this.notification.result === null ? '' : this.notification.result === 1 ? 'mdi-check' : this.notification.result === 0 ? 'mdi-equal' : 'mdi-close'
		}

		click() {
			LeekWars.post('notification/read', {notification_id: this.notification.id})
			this.$store.commit('read-notification', this.notification.id)
		}
	}
</script>

<style lang="scss" scoped>
	.notification {
		height: 50px;
		position: relative;
		display: flex;
		align-items: center;
		&.unread {
			background-color: rgba(90, 194, 0, 0.20);
		}
	}
	.notification:hover {
		background-color: white;
		box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
		&.unread {
			background-color: rgba(90, 194, 0, 0.25);
		}
	}
	.content {
		min-width: 0;
	}
	.title {
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.result {
		position: absolute;
		background: white;
		height: 24px;
		width: 24px;
		border-radius: 50%;
		text-align: center;
		border-bottom: 2px solid #ccc;
		border-right: 2px solid #ccc;
		left: 2px;
		top: 2px;
	}
	.result i {
		font-size: 20px;
		padding-top: 2px;
		padding-left: 2px;
		font-weight: bold;
	}
	.result .mdi-check {
		color: green;
	}
	.result .mdi-close {
		color: red;
	}
	.large-icon {
		position: absolute;
		top: 0;
		right: 80px;
		font-size: 50px;
		opacity: 0.5;
	}
	.message {
		color: #555;
		font-size: 12px;
		margin-top: 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.date {
		position: absolute;
		bottom: 5px;
		right: 0;
		color: #555;
		font-size: 12px;
		padding: 0 8px;
	}
	.image {
		height: 50px;
		width: 50px;
		padding: 10px;
	}
	.notification:not(.bigwin):not(.trophy) img.image {
		opacity: 0.7;
	}
	.image.v-icon {
		font-size: 32px;
		color: #444;
	}
</style>