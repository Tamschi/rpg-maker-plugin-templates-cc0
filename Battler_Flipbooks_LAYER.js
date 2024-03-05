/*:
 * // Also targets MV! This is just to turn off the warning in MZ.
 * @target MZ
 *
 * @pluginname Battler Flipbooks YOUR LAYER
 * @plugindesc (Ver. 0.0.0) <- Change the name, version and this description!
 *
 * @author Your Name or Handle
 * @url https://example.com
 *
 * @base TS_Battler_Flipbooks_Core
 *
 * @orderAfter YEP_BattleEngineCore
 * @orderAfter YEP_X_WeakEnemyPoses
 *
 * // This is a bit of a guess.
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @param rules
 * @text Rules...
 * @desc Animation rules for actors and enemies. The first full match is used.
 * @type struct<FlipbooksRule>[]
 * @default []
 *
 * @param spacer_0_
 * @text -
 * @type string
 *
 * @param enableHomeOverride
 * @text Enable 'Home override'?
 * @desc Allows changing sprite home position dynamically. Slightly reduces performance and compatibility.
 * @type boolean
 * @default false
 *
 * @param requireEnemyWeapons
 * @text Require enemy weapons?
 * @desc Enable weapon filters for enemies. A `.weapons()` API matching actors' MUST be supplied by another plugin.
 * @type boolean
 * @default false
 *
 * @param requireEnemyArmors
 * @text Require enemy armors?
 * @desc Enable armor filters for enemies. A `.armors()` API matching actors' MUST be supplied by another plugin.
 * @type boolean
 * @default false
 *
 * @param spacer_1_
 * @text -
 * @type string
 *
 * @param compatibilityTweaks
 * @text Compatibility tweaks?
 * @desc Tweaks to other plugins' functions for a smoother experience. (Recommended, and doesn't require them.)
 * @type boolean
 * @default true
 *
 * @param spriteSizeTweak
 * @text (YEP) Cache sprite size?
 * @desc Override, iff present, `.spriteWidth()` and `.spriteHeight()` on `Game_Battler` with cached values.
 * @type boolean
 * @default true
 * @parent compatibilityTweaks
 *
 * @param spriteSizeTweakUsePoseForPointer
 * @text Use pose for pointer UX?
 * @desc Iff true, the visible (current pose) size is still used for (e.g. mouse) pointer interactions despite the tweak.
 * @type boolean
 * @default true
 * @parent spriteSizeTweak
 *
 * @param spriteActorUpdateAppearTweak
 * @text `Sprite_Actor..updateAppear` support?
 * @desc Iff true, adjusts `Sprite_Actor..updateAppear` (and hooks `Sprite_Actor..startAppear`) to block that effect there.
 * @type boolean
 * @default true
 * @parent compatibilityTweaks
 *
 * @param spriteActorUpdateDisappearTweak
 * @text `Sprite_Actor..updateDisappear` support?
 * @desc Iff true, adjusts `Sprite_Actor..updateDisappear` to block that effect there.
 * @type boolean
 * @default true
 * @parent compatibilityTweaks
 *
 * @help
 *
 * This Battler Flipbooks layer plugin can animate battlers.
 *
 * It is based on and requires TS_Battler_Flipbooks_Core from
 * https://tamschi.itch.io/battler-flipbooks-core .
 *
 * (Edit the help text to more accurately describe your plugin.)
 */

// The structure definitions copied from TS_Battler_Flipbooks_Core.
// You can extend these as needed.

// Add conditions here:
/*~struct~FlipbooksRule:
 *
 * @param note
 * @text Note
 * @desc For your convenience. (Does nothing.)
 * @type note
 * @default
 *
 * @param preloadResources
 * @text Preload?
 * @desc Asynchronously loads (and keeps) cel and fallback images for likely battle participants. Highly recommended!
 * @type boolean
 * @default true
 *
 * @param flipbook
 * @text Play flipbook...
 * @desc A flipbook with a set of cel animations to use if the rule applies.
 * @type struct<FlipbookWithAnimations>
 * @default
 *
 * @param flipbookTagged__
 * @text after tags:
 * @desc Flipbook tags all required when testing this rule.
 * @type string[]
 * @default []
 * @parent flipbook
 *
 * @param notFlipbookTagged__
 * @text but not tags:
 * @desc Flipbook tags that must NOT be present when testing this rule.
 * @type string[]
 * @default []
 * @parent flipbook
 *
 * @param enabled
 * @text Enable for:
 * @desc The rule can only be matched if this is ON/`true`.
 * @type boolean
 * @default true
 *
 * @param actors
 * @text Actors
 * @desc Select all actors that this rule may apply to. (empty = all; use 0/None for none)
 * @type actor[]
 * @default ["0"]
 * @parent enabled
 *
 * @param enemies
 * @text Enemies
 * @desc Select all enemies that this rule may apply to. (empty = all; use 0/None for none)
 * @type enemy[]
 * @default ["0"]
 * @parent enabled
 *
 * @param battlerNoteTag_
 * @text Battlers w/ note tag
 * @desc The rule will be used for battlers (actors and enemies) whose note contains this text.
 * @type string
 * @default
 * @parent enabled
 *
 * @param filterWeapon
 * @text Filter weapon?
 * @desc Whether to apply this rule based on the equipped weapon (if applicable).
 * @type boolean
 * @default false
 *
 * @param weapons
 * @text weapons
 * @desc Specific weapons, one of which (or one of a given type) to require for this rule.
 * @type weapon[]
 * @default []
 * @parent filterWeapon
 *
 * @param weaponTypes__
 * @text weapon types
 * @desc Weapon types, one of which (or one of the specific ones) to require. Accepts name or ID number (either as string!).
 * @type string[]
 * @default []
 * @parent filterWeapon
 *
 * @param exceptWeapons
 * @text except weapons
 * @desc Specific weapons NOT to match by weapon types above.
 * @type weapon[]
 * @default []
 * @parent weaponTypes__
 *
 * @param weaponNoteTag_
 * @text weapons w/ note tag
 * @desc Enables this rule for any weapons with this text in their note.
 * @type string
 * @default
 * @parent filterWeapon
 *
 * @param filterArmor
 * @text Filter armor?
 * @desc Whether to apply this rule based on the equipped armor (if applicable).
 * @type boolean
 * @default false
 *
 * @param armors
 * @text armors
 * @desc Specific armors, one of which (or one of a given type) to require for this rule.
 * @type armor[]
 * @default []
 * @parent filterArmor
 *
 * @param armorTypes__
 * @text armor types
 * @desc Armor types, one of which (or one of the specific ones) to require. Accepts name or ID number (either as string!).
 * @type string[]
 * @default []
 * @parent filterArmor
 *
 * @param exceptArmors
 * @text except armors
 * @desc Specific armors NOT to match by armor types above.
 * @type armor[]
 * @default []
 * @parent armorTypes__
 *
 * @param armorNoteTag_
 * @text armors w/ note tag
 * @desc Selects armors that this rule can apply with by this text contained in their note.
 * @type string
 * @default
 * @parent filterArmor
 *
 * @param states
 * @text states
 * @desc A battler must have all of these states for the rule to apply.
 * @type state[]
 * @default []
 *
 * @param notStates
 * @text not states
 * @desc A battler must not have any of these states for the rule to apply.
 * @type state[]
 * @default []
 *
 * @param switches
 * @text switches
 * @desc All of these switches must be ON for the rule to apply.
 * @type switch[]
 * @default []
 *
 * @param notSwitches
 * @text not switches
 * @desc All of these switches must be OFF for the rule to apply.
 * @type switch[]
 * @default []
 *
 * @param shorthandCondition
 * @text shorthand condition
 * @desc Boolean shorthand expression. Like the JS condition, but you can use `hp`, `mp`, `tp`, `mhp`...
 * @type note
 * @default
 *
 * @param jsCondition
 * @text JS condition
 * @desc Boolean JavaScript *expression*. You can use `battler` and `index`. Only runs if previous conditions are passed.
 * @type note
 * @default
 */

// Add effects/outcomes here:
/*~struct~FlipbookWithAnimations:
 *
 * @param tags__
 * @text Tags
 * @desc Flipbook tags to present on a battler while this flipbook is visible.
 * @type string[]
 * @default []
 *
 * @param ifNotLoaded_
 * @text If not loaded:
 * @desc Preview = 1st cel.
 * @type select
 * @default Wait, but Preview
 * @option Play Anyway (not recommended here)
 * @value Play Anyway
 * @option Wait
 * @option Wait, but Preview
 * @option Skip (not recommended here)
 * @value Skip
 *
 *
 * @param forSvActorNote
 * @text for SV Actor (Note):
 * @desc For your convenience. (Does nothing.)
 * @type note
 * @default
 *
 * @param forSvActorHomeOverride
 * @text Home override...
 * @desc Use a different home position while this flipbook is active.
 * @type struct<HomeOverride>
 * @default
 * @parent forSvActorNote
 *
 * @param forSvActorIntro_files
 * @text first intro:
 * @desc Select the cels to use for side-view actors.
 * @type file[]
 * @dir img/sv_actors
 * @require 1
 * @default []
 * @parent forSvActorNote
 *
 * // Maximum values are set to an hour (60³) and 999999 repeats to ensure the
 * // calculations stay within safe integer ranges.
 * @param forSvActorIntroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvActorIntro_files
 *
 * @param forSvActorRepeat_files
 * @text then repeat:
 * @desc Select the cels to use for side-view actors.
 * @type file[]
 * @dir img/sv_actors
 * @require 1
 * @default []
 * @parent forSvActorNote
 *
 * @param forSvActorRepeatFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvActorRepeat_files
 *
 * @param forSvActorRepeatLimit
 * @text limit:
 * @desc Stop animation after this many occurrences of the "then repeat:" part.
 * @type number
 * @default 2
 * @min 0
 * @max 999999
 * @parent forSvActorRepeat_files
 *
 * @param forSvActorOutro_files
 * @text then outro:
 * @desc Select the cels to use for side-view actors.
 * @type file[]
 * @dir img/sv_actors
 * @require 1
 * @default []
 * @parent forSvActorNote
 *
 * @param forSvActorOutroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvActorOutro_files
 *
 *
 * @param forEnemyNote
 * @text for Enemy (Note):
 * @desc For your convenience. (Does nothing.)
 * @type note
 * @default
 *
 * @param forEnemyHomeOverride
 * @text Home override...
 * @desc Use a different home position while this flipbook is active.
 * @type struct<HomeOverride>
 * @default
 * @parent forEnemyNote
 *
 * @param forEnemyIntro_files
 * @text first intro:
 * @desc Select the cels to use for front-view enemies.
 * @type file[]
 * @dir img/enemies
 * @require 1
 * @default []
 * @parent forEnemyNote
 *
 * @param forEnemyIntroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forEnemyIntro_files
 *
 * @param forEnemyRepeat_files
 * @text then repeat:
 * @desc Select the cels to use for front-view enemies.
 * @type file[]
 * @dir img/enemies
 * @require 1
 * @default []
 * @parent forEnemyNote
 *
 * @param forEnemyRepeatFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forEnemyRepeat_files
 *
 * @param forEnemyRepeatLimit
 * @text limit:
 * @desc Stop animation after this many occurrences of the "then repeat:" part.
 * @type number
 * @default 2
 * @min 0
 * @max 999999
 * @parent forEnemyRepeat_files
 *
 * @param forEnemyOutro_files
 * @text then outro:
 * @desc Select the cels to use for enemies.
 * @type file[]
 * @dir img/enemies
 * @require 1
 * @default []
 * @parent forEnemyNote
 *
 * @param forEnemyOutroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forEnemyOutro_files
 *
 *
 * @param forSvEnemyNote
 * @text for SV Enemy (Note):
 * @desc For your convenience. (Does nothing.)
 * @type note
 * @default
 *
 * @param forSvEnemyHomeOverride
 * @text Home override...
 * @desc Use a different home position while this flipbook is active.
 * @type struct<HomeOverride>
 * @default
 * @parent forSvEnemyNote
 *
 * @param forSvEnemyIntro_files
 * @text first intro:
 * @desc Select the cels to use for side-view enemies.
 * @type file[]
 * @dir img/sv_enemies
 * @require 1
 * @default []
 * @parent forSvEnemyNote
 *
 * @param forSvEnemyIntroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvEnemyIntro_files
 *
 * @param forSvEnemyRepeat_files
 * @text then repeat:
 * @desc Select the cels to use for side-view enemies.
 * @type file[]
 * @dir img/sv_enemies
 * @require 1
 * @default []
 * @parent forSvEnemyNote
 *
 * @param forSvEnemyRepeatFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvEnemyRepeat_files
 *
 * @param forSvEnemyRepeatLimit
 * @text limit:
 * @desc Stop animation after this many occurrences of the "then repeat:" part.
 * @type number
 * @default 2
 * @min 0
 * @max 999999
 * @parent forSvEnemyRepeat_files
 *
 * @param forSvEnemyOutro_files
 * @text then outro:
 * @desc Select the cels to use for side-view enemies.
 * @type file[]
 * @dir img/sv_enemies
 * @require 1
 * @default []
 * @parent forSvEnemyNote
 *
 * @param forSvEnemyOutroFrameDelay
 * @text frame delay:
 * @desc How many frames to show each cel for.
 * @type number
 * @default 12
 * @min 1
 * @max 216000
 * @parent forSvEnemyOutro_files
 *
 * @param spacer_1_
 * @text -
 * @type string
 *
 * @param interruptsActiveCycle
 * @text Interrupt paused cycles?
 * @desc Fast-forwards (lower-priority) flipbooks from earlier layer plugins to resume at their next cycle start.
 * @type boolean
 * @default true
 *
 * @param blockEffects__
 * @text Block effects:
 * @desc Blocks specified sprite effects while the rule is applied (clearing the effect instead). Default: []
 * @type combo[]
 * @option whiten
 * @option blink
 * @option appear
 * @option disappear
 * @option collapse
 * @option bossCollapse
 * @option instantCollapse
 *
 * @param blockMotions__
 * @text Block motions:
 * @desc Blocks specified sprite motions while the rule is applied (clearing the motion instead). Default: []
 * @type combo[]
 * @option guard
 * @option spell
 * @option skill
 * @option item
 * @option thrust
 * @option swing
 * @option missile
 * @option damage
 * @option evade
 * @option victory
 * @option escape
 */

/*~struct~HomeOverride:
 *
 * @param mode_
 * @text Mode:
 * @desc Choose between OFF, Relative and Absolute.
 * @type select
 * @default OFF
 * @option OFF
 * @option Relative
 * @option Absolute
 *
 * @param x
 * @text x
 * @desc The x-coordinate of the home position (offset or absolute). This is a JS expression. Empty = unchanged.
 * @type note
 * @default
 * @parent mode_
 *
 * @param y
 * @text y
 * @desc The y-coordinate of the home position (offset or absolute). This is a JS expression. Empty = unchanged.
 * @type note
 * @default
 * @parent mode_
 *
 * @param useWhen_
 * @text Use when:
 * @desc When to apply the offset, checked by calling `.battlerName()` and optionally comparing the result.
 * @type select
 * @default VisibleFuzzy
 * @option Active
 * @option Visible (fuzzy)
 * @value VisibleFuzzy
 * @option Visible (strict)
 * @value VisibleStrict
 */

'use strict';

try {
    // Change this to match the name of this file after renaming it to something unique!
    const MY_LAYER = 'Battler_Flipbooks_LAYER';

    const core = window['TS_Battler_Flipbooks_Core'];
    if (!core) {
        throw new TS_Battler_Entrance_Flipbooks__Error("This plugin requires TS_Battler_Flipbooks_Core to be loaded earlier.");
    }

    // Class definitions:
    // It's good to have these even if empty to see where errors come from.
    // You can rename them freely.

    class MyHomeOverride extends core.HomeOverride { }

    class MyAnimation extends core.FlipbookAnimation {
        /** @override */ static getHomeOverrideClass() { return MyHomeOverride; }
    }

    class MyFlipbook extends core.Flipbook {
		/** @override */ static getFlipbookAnimationClass() { return MyAnimation; }

        /** @override */
        initialize(dpo) {
            super.initialize(dpo);

            // Assign custom properties on `this` from `dpo` here if needed:
            // `this.myEffectParameter = dpo.myEffectParameter;`, etc.
        }

        // Consider adding getters and setters for your properties here,
        // so that the values are automatically validated.
    }

    class MyRule extends core.FlipbooksRule {
        /** @override */ static getFlipbookClass() { return MyFlipbook; }

        /** @override */
        initialize(dpo) {
            super.initialize(dpo);

            // Assign custom properties on `this` from `dpo` here if needed:
            // `this.myConditionParameter = dpo.myConditionParameter;`, etc.
        }

        // Consider adding getters and setters for your properties here,
        // so that the values are automatically validated.

		/** @override */ mayApplyTo(battler) {
            // You can narrow the condition here to limit preloading,
            // which can reduce the game's memory requirements.
            //
            // For best results, ensure that this function returns `true` at
            // least once for all rules that may apply in the current battle.
            return super.mayApplyTo(battler);
        }

        /** @override */ static expandShorthand(shorthand) {
            shorthand = super.expandShorthand(shorthand);

            // Implement additional shorthand expansions here.

            return shorthand;
        }

        /** @override */ testWithoutExpressions({
            battler,
            index,
            activeTags,
            requireEnemyWeapons = false,
            requireEnemyArmors = false,
        }) {
            if (!super.testWithoutExpressions(...arguments)) return false;

            // Implement added conditions here.

            return true;
        }
    }

    class MyRuntime extends core.FlipbooksRuntime { }

    const parameters = PluginManager.parameters(MY_LAYER);
    core.decodeParameters(parameters); // Parses all parameters.
    // For some parameter types, suffixes are required on the `@param` for this to work!:
    // `_` for `@type string`
    // `__` for `@type string[]`
    // `_file` for `@type file`
    // `_files` for `@type file[]`

    // Normalise and hydrate the parameters:
    parameters.rules = (parameters.rules || []).map(decodedParameterObject => new MyRule(decodedParameterObject));
    //
    parameters.enableHomeOverride = !!parameters.enableHomeOverride;
    parameters.requireEnemyWeapons = !!parameters.requireEnemyWeapons;
    parameters.requireEnemyArmors = !!parameters.requireEnemyArmors;
    //
    parameters.compatibilityTweaks = !!parameters.compatibilityTweaks;
    parameters.spriteSizeTweak = !!parameters.spriteSizeTweak;
    parameters.spriteSizeTweakUsePoseForPointer = !!parameters.spriteSizeTweakUsePoseForPointer;
    parameters.spriteActorUpdateAppearTweak = !!parameters.spriteActorUpdateAppearTweak;
    parameters.spriteActorUpdateDisappearTweak = !!parameters.spriteActorUpdateDisappearTweak;

    // Instantiate the runtime (only once as the plugin is loaded):
    const runtime = new MyRuntime({
        rules: parameters.rules,
        enableHomeOverride: parameters.enableHomeOverride,
        compatibilityTweaks: parameters.compatibilityTweaks,
        spriteSizeTweak: parameters.spriteSizeTweak,
        spriteSizeTweakUsePoseForPointer: parameters.spriteSizeTweakUsePoseForPointer,
        spriteActorUpdateAppearTweak: parameters.spriteActorUpdateAppearTweak,
        spriteActorUpdateDisappearTweak: parameters.spriteActorUpdateDisappearTweak,
    });

    Object.defineProperties(parameters, {
        // Redirect the `rules` property to change te runtime's rules live:
        rules: {
            get() { return runtime.rules; },
            set(rules) { runtime.rules = rules; },
        },

        // These determine whether hooks are installed, so changing them at
        // runtime would not behave as expected.
        enableHomeOverride: { configurable: false, writable: false, },
        compatibilityTweaks: { configurable: false, writable: false, },
        spriteSizeTweak: { configurable: false, writable: false, },
        spriteSizeTweakUsePoseForPointer: { configurable: false, writable: false, },
    });

    // An API isn't necessary, but recommended.
    const api = window[MY_LAYER] = {
        /**
         * The version of this plugin.
         * This is useful to let other plugins check compatibility requirements.
         */
        version: {
            /** Incremented with feature additions. */
            featureLevel: 0,
            /** Incremented with internal changes that don't add features. */
            patchLevel: 0,
        },

        // Expose settings and live runtime.
        parameters, runtime,

        // Expose classes, so that other plugins may extend this one:
        MyHomeOverride, MyAnimation, MyFlipbook, MyRule, MyRuntime,

        // Exposed hook (example!):
        ...core.makeHook(() => api, Game_Battler.prototype, function performDamage() {

            // `applyRules` tests all rules added to the runtime and starts an
            // animation if one of them is found to match this battler.
            runtime.applyRules(this, {});

            // Call the original function:
            // `newPerformDamage` and `oldPerformDamage` are created by `makeHook`.
            return api.oldPerformDamage.apply(this, arguments);
        }),
        // This style of exposed hook has the advantage of being easy to
        // manipulate by other plugins (since it is installed with a small
        // trampoline that first calls `api.newPerformDamage, which is the
        // function above).
        // Any other way to call `runtime.applyRules(…)` with the appropriate
        // timing also works, of course.

        // Check the TS_Battler_Flipbooks_Core.d.ts definitions file for many
        // more useful ways to interact with Battler Flipbooks Core's features!
    };
} catch (error) {
    /**
     * Raises `error` in a way that causes the game to display it.
     * Errors thrown during plugin initialisation are normally discarded
     * silently instead in RPG Maker MV.
     */
    void function raising() {
        if (!SceneManager._scene) {
            setTimeout(raising, 1000);
        } else {
            SceneManager.catchException(error);
        }
    }();
    throw error;
}
