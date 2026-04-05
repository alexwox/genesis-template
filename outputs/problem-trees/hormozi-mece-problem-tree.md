# Deep MECE Business Bottleneck Tree

## Source Scope

- Included: all PDFs in `assets` under 30MB.
- Excluded by rule: `$100M Scaling Roadmap-combined.pdf`, `ACQ Ads Handbook.pdf`, `AQC Closer handbook.pdf`.
- Framework synthesis grounded in the included Hormozi books and playbooks across offer, pricing, leads, sales, nurture, LTV, retention, branding, and money models.

## Consolidated Frameworks and Lessons

### 1) Demand System Frameworks

- **Offer architecture**: `GrandSlamOffer`, `ValueEquation`, `TrimAndStack`, `ScarcityUrgencyBonusesGuaranteesNaming`.
- **Market and avatar**: `StarvingCrowd`, avatar specificity, painful problem and purchasable market selection.
- **Message and ads**: `HookMeatCta`, awareness level matching, hook taxonomy and 70 20 10 testing cadence.
- **Lead engines**: `CoreFourLeads` with warm outreach, free content, cold outreach, and paid ads.
- **Funnel economics**: `CFA` with `CAC`, `LTGP`, `PaybackDays`, and first 30 day cash logic.
- **Sales conversion**: `SkillTimesConviction`, objection handling systems, show up and close rate discipline.
- **Key lesson**: demand bottlenecks are usually a mismatch between avatar, message, offer, and conversion architecture rather than a pure traffic shortage.

### 2) Supply System Frameworks

- **Delivery design**: delivery cube choices across support format, effort model, and speed.
- **Activation and onboarding**: first value acceleration, milestone completion, and usage shaping.
- **Retention system**: churn prevention loops, save flows, community and engagement rituals.
- **Expansion system**: upsell, cross sell, downsell, continuity ladder from `MoneyModel`.
- **Unit economics control**: gross margin by offer, delivery cost management, and recurring economics.
- **Capacity and operations**: throughput, scheduling, staffing leverage, and process reliability.
- **Key lesson**: supply bottlenecks are usually hidden in activation friction, low outcome consistency, or weak capacity economics before they appear as obvious churn or cash stress.

### 3) Diagnostic Meta Rules

- Diagnose from **constraint first**, not from favorite tactic.
- Separate **demand conversion issues** from **supply fulfillment issues** before prescribing fixes.
- Follow **funnel breakpoints** in order: impression to click to lead to show to close to activate to retain to expand.
- Prioritize the **single current bottleneck** with the highest marginal impact.
- Use metric gates to avoid opinion based diagnosis.

## How To Traverse This Tree

1. Start with current business objective and identify primary symptom.
2. Choose `DemandConstraint` or `SupplyConstraint` by where the largest drop or delay occurs.
3. Move one level at a time and only branch when data supports the split.
4. At each diagnostic node, compare actual metrics to threshold signals.
5. Stop at the deepest confirmed root cause and define the next 1 to 3 experiments.

## Deep MECE Problem Tree

```mermaid
flowchart TD
RootBusiness["BusinessPerformanceConstraint"]
RootBusiness --> DemandConstraint["DemandConstraint"]
RootBusiness --> SupplyConstraint["SupplyConstraint"]

DemandConstraint --> DemandAcquisition["DemandLayer1_AcquisitionAndConversion"]
DemandConstraint --> DemandEconomics["DemandLayer1_DemandEconomics"]

DemandAcquisition --> TrafficVolume["DemandLayer2_TrafficVolume"]
DemandAcquisition --> TrafficQuality["DemandLayer2_TrafficQuality"]
DemandAcquisition --> JourneyConversion["DemandLayer2_JourneyConversion"]

TrafficVolume --> ChannelCoverage["DemandLayer3_ChannelCoverage"]
TrafficVolume --> ContentCadence["DemandLayer3_ContentAndCampaignCadence"]

TrafficQuality --> AvatarFit["DemandLayer3_AvatarFit"]
TrafficQuality --> MessageMatch["DemandLayer3_MessageMarketMatch"]

JourneyConversion --> LeadCapture["DemandLayer3_LeadCapture"]
JourneyConversion --> SalesConversion["DemandLayer3_SalesConversion"]

ChannelCoverage --> ChannelSinglePoint["DemandLayer4_OneChannelDependency"]
ChannelCoverage --> ChannelExecution["DemandLayer4_ChannelExecutionDepth"]

ContentCadence --> TestingCadence["DemandLayer4_TestingCadence"]
ContentCadence --> CreativeDepth["DemandLayer4_CreativeDepth"]

AvatarFit --> AvatarSpecificity["DemandLayer4_AvatarSpecificity"]
AvatarFit --> AvatarPainSeverity["DemandLayer4_AvatarPainSeverity"]

MessageMatch --> HookStrength["DemandLayer4_HookStrength"]
MessageMatch --> PromiseClarity["DemandLayer4_PromiseClarity"]

LeadCapture --> LandingPath["DemandLayer4_LandingPathClarity"]
LeadCapture --> FollowUpEntry["DemandLayer4_FollowUpEntrySpeed"]

SalesConversion --> ShowRateBranch["DemandLayer4_ShowRate"]
SalesConversion --> CloseRateBranch["DemandLayer4_CloseRate"]
SalesConversion --> ObjectionPattern["DemandLayer4_ObjectionPattern"]

ChannelSinglePoint --> NewPlacementGap["DemandLayer5_NewPlacementGap"]
ChannelSinglePoint --> NewPlatformGap["DemandLayer5_NewPlatformGap"]

ChannelExecution --> TrackingIntegrity["DemandLayer5_TrackingIntegrity"]
ChannelExecution --> OfferToChannelFit["DemandLayer5_OfferToChannelFit"]

TestingCadence --> HookTestDepth["DemandLayer5_HookTestDepth"]
TestingCadence --> CreativeRefreshRate["DemandLayer5_CreativeRefreshRate"]

CreativeDepth --> ProofAssetCount["DemandLayer5_ProofAssetCount"]
CreativeDepth --> FormatDiversity["DemandLayer5_FormatDiversity"]

AvatarSpecificity --> SegmentPrecision["DemandLayer5_SegmentPrecision"]
AvatarSpecificity --> BuyingStageFit["DemandLayer5_BuyingStageFit"]

AvatarPainSeverity --> PainFrequency["DemandLayer5_PainFrequency"]
AvatarPainSeverity --> PainCostVisibility["DemandLayer5_PainCostVisibility"]

HookStrength --> AttentionCapture["DemandLayer5_AttentionCapture"]
HookStrength --> SelfIdentification["DemandLayer5_SelfIdentification"]

PromiseClarity --> DreamOutcomeClarity["DemandLayer5_DreamOutcomeClarity"]
PromiseClarity --> TimeToResultBelief["DemandLayer5_TimeToResultBelief"]

LandingPath --> FrictionLoad["DemandLayer5_FrictionLoad"]
LandingPath --> NextStepClarity["DemandLayer5_NextStepClarity"]

FollowUpEntry --> SpeedToLead["DemandLayer5_SpeedToLead"]
FollowUpEntry --> ContactAttemptVolume["DemandLayer5_ContactAttemptVolume"]

ShowRateBranch --> SchedulingLatency["DemandLayer5_SchedulingLatency"]
ShowRateBranch --> ReminderSystem["DemandLayer5_ReminderSystem"]

CloseRateBranch --> SalesSkillConviction["DemandLayer5_SalesSkillTimesConviction"]
CloseRateBranch --> OfferStackPresentation["DemandLayer5_OfferStackPresentation"]

ObjectionPattern --> PriceObjectionShare["DemandLayer5_PriceObjectionShare"]
ObjectionPattern --> TrustObjectionShare["DemandLayer5_TrustObjectionShare"]
ObjectionPattern --> TimingObjectionShare["DemandLayer5_TimingObjectionShare"]

DemandEconomics --> CacStructure["DemandLayer2_CacStructure"]
DemandEconomics --> LtgpStructure["DemandLayer2_LtgpStructure"]
DemandEconomics --> PaybackStructure["DemandLayer2_PaybackStructure"]

CacStructure --> CacVsBenchmark["DemandLayer3_CacVsMarketBenchmark"]
CacStructure --> CacByChannel["DemandLayer3_CacByChannelVariance"]

LtgpStructure --> GrossMarginBase["DemandLayer3_GrossMarginBase"]
LtgpStructure --> RepeatAndExpansion["DemandLayer3_RepeatAndExpansion"]

PaybackStructure --> Cash30Day["DemandLayer3_First30DayCash"]
PaybackStructure --> AcquisitionReinvestment["DemandLayer3_ReinvestmentCapacity"]

NewPlacementGap --> PlacementExperimentRate["DemandLayer6_PlacementExperimentRate"]
NewPlatformGap --> PlatformExperimentRate["DemandLayer6_PlatformExperimentRate"]
TrackingIntegrity --> SourceAttributionAccuracy["DemandLayer6_SourceAttributionAccuracy"]
OfferToChannelFit --> ChannelIntentMatch["DemandLayer6_ChannelIntentMatch"]
HookTestDepth --> HookVariantsPerWeek["DemandLayer6_HookVariantsPerWeek"]
CreativeRefreshRate --> CreativeAgeDecay["DemandLayer6_CreativeAgeDecay"]
ProofAssetCount --> TestimonialsPerMonth["DemandLayer6_TestimonialsPerMonth"]
FormatDiversity --> CreativeFormatSpread["DemandLayer6_CreativeFormatSpread"]
SegmentPrecision --> SegmentCacSpread["DemandLayer6_SegmentCacSpread"]
BuyingStageFit --> StageSpecificMessaging["DemandLayer6_StageSpecificMessaging"]
PainFrequency --> WeeklyPainEvents["DemandLayer6_WeeklyPainEvents"]
PainCostVisibility --> CostOfInactionClarity["DemandLayer6_CostOfInactionClarity"]
AttentionCapture --> ThumbStopRate["DemandLayer6_ThumbStopRate"]
SelfIdentification --> QualifiedClickRate["DemandLayer6_QualifiedClickRate"]
DreamOutcomeClarity --> OutcomeStatementSpecificity["DemandLayer6_OutcomeStatementSpecificity"]
TimeToResultBelief --> TimeClaimCredibility["DemandLayer6_TimeClaimCredibility"]
FrictionLoad --> FormFieldBurden["DemandLayer6_FormFieldBurden"]
NextStepClarity --> ConfirmationComprehension["DemandLayer6_ConfirmationComprehension"]
SpeedToLead --> FirstResponseSeconds["DemandLayer6_FirstResponseSeconds"]
ContactAttemptVolume --> AttemptsFirstSevenDays["DemandLayer6_AttemptsFirstSevenDays"]
SchedulingLatency --> DaysToAppointment["DemandLayer6_DaysToAppointment"]
ReminderSystem --> ReminderTouchCount["DemandLayer6_ReminderTouchCount"]
SalesSkillConviction --> CallReviewScore["DemandLayer6_CallReviewScore"]
OfferStackPresentation --> ValueStackCompletion["DemandLayer6_ValueStackCompletion"]
PriceObjectionShare --> PriceToValueGap["DemandLayer6_PriceToValueGap"]
TrustObjectionShare --> ProofDensityInSales["DemandLayer6_ProofDensityInSales"]
TimingObjectionShare --> UrgencyMechanicStrength["DemandLayer6_UrgencyMechanicStrength"]
CacVsBenchmark --> CacRiskFlag["DemandLayer4_CacRiskFlag"]
CacByChannel --> ChannelEfficiencySpread["DemandLayer4_ChannelEfficiencySpread"]
GrossMarginBase --> MarginByOfferTier["DemandLayer4_MarginByOfferTier"]
RepeatAndExpansion --> RepeatPurchaseRate["DemandLayer4_RepeatPurchaseRate"]
Cash30Day --> CashRecoveryWindow["DemandLayer4_CashRecoveryWindow"]
AcquisitionReinvestment --> AdBudgetRecycleRate["DemandLayer4_AdBudgetRecycleRate"]

PlacementExperimentRate --> DemandRootA1["DemandLayer7_RootCause_InsufficientPlacementTesting"]
PlatformExperimentRate --> DemandRootA2["DemandLayer7_RootCause_InsufficientPlatformExpansion"]
SourceAttributionAccuracy --> DemandRootA3["DemandLayer7_RootCause_BrokenAttribution"]
ChannelIntentMatch --> DemandRootA4["DemandLayer7_RootCause_ChannelIntentMismatch"]
HookVariantsPerWeek --> DemandRootB1["DemandLayer7_RootCause_LowHookOutput"]
CreativeAgeDecay --> DemandRootB2["DemandLayer7_RootCause_CreativeFatigue"]
TestimonialsPerMonth --> DemandRootB3["DemandLayer7_RootCause_ProofScarcity"]
CreativeFormatSpread --> DemandRootB4["DemandLayer7_RootCause_LowFormatCoverage"]
SegmentCacSpread --> DemandRootC1["DemandLayer7_RootCause_AvatarTooBroad"]
StageSpecificMessaging --> DemandRootC2["DemandLayer7_RootCause_StageMessageMismatch"]
WeeklyPainEvents --> DemandRootC3["DemandLayer7_RootCause_LowPainUrgencySegment"]
CostOfInactionClarity --> DemandRootC4["DemandLayer7_RootCause_WeakProblemAgitation"]
ThumbStopRate --> DemandRootD1["DemandLayer7_RootCause_HookWeakness"]
QualifiedClickRate --> DemandRootD2["DemandLayer7_RootCause_CalloutMismatch"]
OutcomeStatementSpecificity --> DemandRootD3["DemandLayer7_RootCause_VaguePromise"]
TimeClaimCredibility --> DemandRootD4["DemandLayer7_RootCause_PromiseDistrust"]
FormFieldBurden --> DemandRootE1["DemandLayer7_RootCause_LeadCaptureFriction"]
ConfirmationComprehension --> DemandRootE2["DemandLayer7_RootCause_NextStepConfusion"]
FirstResponseSeconds --> DemandRootE3["DemandLayer7_RootCause_SpeedToLeadFailure"]
AttemptsFirstSevenDays --> DemandRootE4["DemandLayer7_RootCause_LowFollowUpCadence"]
DaysToAppointment --> DemandRootF1["DemandLayer7_RootCause_BookingDelay"]
ReminderTouchCount --> DemandRootF2["DemandLayer7_RootCause_ReminderSystemWeak"]
CallReviewScore --> DemandRootF3["DemandLayer7_RootCause_SalesExecutionGap"]
ValueStackCompletion --> DemandRootF4["DemandLayer7_RootCause_OfferPresentationGap"]
PriceToValueGap --> DemandRootF5["DemandLayer7_RootCause_PricingValueMismatch"]
ProofDensityInSales --> DemandRootF6["DemandLayer7_RootCause_TrustTransferWeak"]
UrgencyMechanicStrength --> DemandRootF7["DemandLayer7_RootCause_UrgencyWeak"]
CacRiskFlag --> DemandRootG1["DemandLayer5_RootCause_CacTooHigh"]
ChannelEfficiencySpread --> DemandRootG2["DemandLayer5_RootCause_ChannelMixInefficiency"]
MarginByOfferTier --> DemandRootG3["DemandLayer5_RootCause_MarginFloorTooLow"]
RepeatPurchaseRate --> DemandRootG4["DemandLayer5_RootCause_RepeatEngineWeak"]
CashRecoveryWindow --> DemandRootG5["DemandLayer5_RootCause_PaybackTooSlow"]
AdBudgetRecycleRate --> DemandRootG6["DemandLayer5_RootCause_ReinvestmentConstraint"]

DemandRootA1 --> DemandActionA1["DemandLayer8_Action_IncreasePlacementTestsWeekly"]
DemandRootA2 --> DemandActionA2["DemandLayer8_Action_OpenNewPlatformSequence"]
DemandRootA3 --> DemandActionA3["DemandLayer8_Action_RebuildAttributionSchema"]
DemandRootA4 --> DemandActionA4["DemandLayer8_Action_ReMapOfferToIntentChannel"]
DemandRootB1 --> DemandActionB1["DemandLayer8_Action_SetHookOutputQuota"]
DemandRootB2 --> DemandActionB2["DemandLayer8_Action_CreativeRefreshCadence"]
DemandRootB3 --> DemandActionB3["DemandLayer8_Action_ProofCaptureSystem"]
DemandRootB4 --> DemandActionB4["DemandLayer8_Action_AddMissingCreativeFormats"]
DemandRootC1 --> DemandActionC1["DemandLayer8_Action_NarrowIcpAndSubsegments"]
DemandRootC2 --> DemandActionC2["DemandLayer8_Action_MapMessageByAwarenessStage"]
DemandRootC3 --> DemandActionC3["DemandLayer8_Action_ShiftToHigherUrgencyAvatar"]
DemandRootC4 --> DemandActionC4["DemandLayer8_Action_ClarifyCostOfInaction"]
DemandRootD1 --> DemandActionD1["DemandLayer8_Action_RewritePrimaryHooks"]
DemandRootD2 --> DemandActionD2["DemandLayer8_Action_FixCalloutPrecision"]
DemandRootD3 --> DemandActionD3["DemandLayer8_Action_SpecifyOutcomePromise"]
DemandRootD4 --> DemandActionD4["DemandLayer8_Action_AddProofAndGuarantee"]
DemandRootE1 --> DemandActionE1["DemandLayer8_Action_ReduceFormAndStepFriction"]
DemandRootE2 --> DemandActionE2["DemandLayer8_Action_ReworkNextStepMessaging"]
DemandRootE3 --> DemandActionE3["DemandLayer8_Action_SubSixtySecondResponseOps"]
DemandRootE4 --> DemandActionE4["DemandLayer8_Action_SevenDayFollowUpPlaybook"]
DemandRootF1 --> DemandActionF1["DemandLayer8_Action_OfferSameDaySlots"]
DemandRootF2 --> DemandActionF2["DemandLayer8_Action_MultiTouchReminderStack"]
DemandRootF3 --> DemandActionF3["DemandLayer8_Action_CallCoachingAndReviewSystem"]
DemandRootF4 --> DemandActionF4["DemandLayer8_Action_RebuildValueStackPitchFlow"]
DemandRootF5 --> DemandActionF5["DemandLayer8_Action_AdjustPriceAndStackValue"]
DemandRootF6 --> DemandActionF6["DemandLayer8_Action_InsertProofAtObjectionPoints"]
DemandRootF7 --> DemandActionF7["DemandLayer8_Action_StrengthenScarcityUrgency"]
DemandRootG1 --> DemandActionG1["DemandLayer6_Action_LowerCacBeforeScale"]
DemandRootG2 --> DemandActionG2["DemandLayer6_Action_ReallocateBudgetToEfficientChannels"]
DemandRootG3 --> DemandActionG3["DemandLayer6_Action_RepriceOrRedesignOfferTiers"]
DemandRootG4 --> DemandActionG4["DemandLayer6_Action_InstallRepeatPurchaseOffers"]
DemandRootG5 --> DemandActionG5["DemandLayer6_Action_ImproveThirtyDayCashOffer"]
DemandRootG6 --> DemandActionG6["DemandLayer6_Action_CompressPaybackCycle"]

DemandActionA1 --> DemandMetricGateA1["DemandLayer9_MetricGate_PlacementTestsPerWeek"]
DemandActionA2 --> DemandMetricGateA2["DemandLayer9_MetricGate_NewPlatformSpendShare"]
DemandActionA3 --> DemandMetricGateA3["DemandLayer9_MetricGate_AttributionCoverageRate"]
DemandActionA4 --> DemandMetricGateA4["DemandLayer9_MetricGate_ChannelIntentAlignmentScore"]
DemandActionB1 --> DemandMetricGateB1["DemandLayer9_MetricGate_HookOutputWeekly"]
DemandActionB2 --> DemandMetricGateB2["DemandLayer9_MetricGate_CreativeRefreshDays"]
DemandActionB3 --> DemandMetricGateB3["DemandLayer9_MetricGate_NewProofAssetsMonthly"]
DemandActionB4 --> DemandMetricGateB4["DemandLayer9_MetricGate_FormatCoverageCount"]
DemandActionC1 --> DemandMetricGateC1["DemandLayer9_MetricGate_CacVarianceBySegment"]
DemandActionC2 --> DemandMetricGateC2["DemandLayer9_MetricGate_CtrByAwarenessLevel"]
DemandActionC3 --> DemandMetricGateC3["DemandLayer9_MetricGate_UrgentPainLeadRatio"]
DemandActionC4 --> DemandMetricGateC4["DemandLayer9_MetricGate_ProblemAcknowledgementRate"]
DemandActionD1 --> DemandMetricGateD1["DemandLayer9_MetricGate_HookRetentionRate"]
DemandActionD2 --> DemandMetricGateD2["DemandLayer9_MetricGate_QualifiedClickRatio"]
DemandActionD3 --> DemandMetricGateD3["DemandLayer9_MetricGate_OfferComprehensionRate"]
DemandActionD4 --> DemandMetricGateD4["DemandLayer9_MetricGate_TrustLiftRate"]
DemandActionE1 --> DemandMetricGateE1["DemandLayer9_MetricGate_LeadFormCompletionRate"]
DemandActionE2 --> DemandMetricGateE2["DemandLayer9_MetricGate_NextStepCompletionRate"]
DemandActionE3 --> DemandMetricGateE3["DemandLayer9_MetricGate_MedianFirstResponseSeconds"]
DemandActionE4 --> DemandMetricGateE4["DemandLayer9_MetricGate_SevenDayContactRate"]
DemandActionF1 --> DemandMetricGateF1["DemandLayer9_MetricGate_SameDayBookingRate"]
DemandActionF2 --> DemandMetricGateF2["DemandLayer9_MetricGate_ShowRate"]
DemandActionF3 --> DemandMetricGateF3["DemandLayer9_MetricGate_CallQualityScore"]
DemandActionF4 --> DemandMetricGateF4["DemandLayer9_MetricGate_ValueStackCompletionRate"]
DemandActionF5 --> DemandMetricGateF5["DemandLayer9_MetricGate_CloseRateAfterReprice"]
DemandActionF6 --> DemandMetricGateF6["DemandLayer9_MetricGate_TrustObjectionShare"]
DemandActionF7 --> DemandMetricGateF7["DemandLayer9_MetricGate_TimingObjectionShare"]
DemandActionG1 --> DemandMetricGateG1["DemandLayer7_MetricGate_CacTrend"]
DemandActionG2 --> DemandMetricGateG2["DemandLayer7_MetricGate_ChannelContributionMargin"]
DemandActionG3 --> DemandMetricGateG3["DemandLayer7_MetricGate_GrossMarginByTier"]
DemandActionG4 --> DemandMetricGateG4["DemandLayer7_MetricGate_RepeatPurchaseRate"]
DemandActionG5 --> DemandMetricGateG5["DemandLayer7_MetricGate_ThirtyDayCashPerCustomer"]
DemandActionG6 --> DemandMetricGateG6["DemandLayer7_MetricGate_PaybackDays"]

DemandMetricGateA1 --> DemandResolved["DemandLayer10_ConstraintResolvedOrEscalate"]
DemandMetricGateA2 --> DemandResolved
DemandMetricGateA3 --> DemandResolved
DemandMetricGateA4 --> DemandResolved
DemandMetricGateB1 --> DemandResolved
DemandMetricGateB2 --> DemandResolved
DemandMetricGateB3 --> DemandResolved
DemandMetricGateB4 --> DemandResolved
DemandMetricGateC1 --> DemandResolved
DemandMetricGateC2 --> DemandResolved
DemandMetricGateC3 --> DemandResolved
DemandMetricGateC4 --> DemandResolved
DemandMetricGateD1 --> DemandResolved
DemandMetricGateD2 --> DemandResolved
DemandMetricGateD3 --> DemandResolved
DemandMetricGateD4 --> DemandResolved
DemandMetricGateE1 --> DemandResolved
DemandMetricGateE2 --> DemandResolved
DemandMetricGateE3 --> DemandResolved
DemandMetricGateE4 --> DemandResolved
DemandMetricGateF1 --> DemandResolved
DemandMetricGateF2 --> DemandResolved
DemandMetricGateF3 --> DemandResolved
DemandMetricGateF4 --> DemandResolved
DemandMetricGateF5 --> DemandResolved
DemandMetricGateF6 --> DemandResolved
DemandMetricGateF7 --> DemandResolved
DemandMetricGateG1 --> DemandResolved
DemandMetricGateG2 --> DemandResolved
DemandMetricGateG3 --> DemandResolved
DemandMetricGateG4 --> DemandResolved
DemandMetricGateG5 --> DemandResolved
DemandMetricGateG6 --> DemandResolved

SupplyConstraint --> SupplyCapacity["SupplyLayer1_CapacityAndOperations"]
SupplyConstraint --> SupplyValue["SupplyLayer1_ValueDeliveryAndRetention"]
SupplyConstraint --> SupplyEconomics["SupplyLayer1_UnitEconomicsAndCash"]

SupplyCapacity --> TeamCapacity["SupplyLayer2_TeamCapacity"]
SupplyCapacity --> ProcessReliability["SupplyLayer2_ProcessReliability"]
SupplyCapacity --> ToolingAutomation["SupplyLayer2_ToolingAutomation"]

SupplyValue --> OnboardingActivation["SupplyLayer2_OnboardingActivation"]
SupplyValue --> OutcomeConsistency["SupplyLayer2_OutcomeConsistency"]
SupplyValue --> RetentionEngine["SupplyLayer2_RetentionEngine"]
SupplyValue --> ExpansionEngine["SupplyLayer2_ExpansionEngine"]

SupplyEconomics --> MarginControl["SupplyLayer2_MarginControl"]
SupplyEconomics --> ChurnEconomics["SupplyLayer2_ChurnEconomics"]
SupplyEconomics --> CashFlowStress["SupplyLayer2_CashFlowStress"]

TeamCapacity --> UtilizationBalance["SupplyLayer3_UtilizationBalance"]
TeamCapacity --> SkillCoverage["SupplyLayer3_SkillCoverage"]

ProcessReliability --> CycleTime["SupplyLayer3_CycleTime"]
ProcessReliability --> ReworkRate["SupplyLayer3_ReworkRate"]
ProcessReliability --> QaConsistency["SupplyLayer3_QaConsistency"]

ToolingAutomation --> ManualHandoffCount["SupplyLayer3_ManualHandoffCount"]
ToolingAutomation --> DataVisibility["SupplyLayer3_DataVisibility"]

OnboardingActivation --> TimeToFirstValue["SupplyLayer3_TimeToFirstValue"]
OnboardingActivation --> ActivationCompletion["SupplyLayer3_ActivationCompletion"]

OutcomeConsistency --> MilestoneAttainment["SupplyLayer3_MilestoneAttainment"]
OutcomeConsistency --> CustomerEffortScore["SupplyLayer3_CustomerEffortScore"]

RetentionEngine --> UsageFrequency["SupplyLayer3_UsageFrequency"]
RetentionEngine --> SaveFlowStrength["SupplyLayer3_SaveFlowStrength"]
RetentionEngine --> CommunityStickiness["SupplyLayer3_CommunityStickiness"]

ExpansionEngine --> UpsellFit["SupplyLayer3_UpsellFit"]
ExpansionEngine --> CrossSellFit["SupplyLayer3_CrossSellFit"]
ExpansionEngine --> DownsellRecovery["SupplyLayer3_DownsellRecovery"]
ExpansionEngine --> ContinuityStructure["SupplyLayer3_ContinuityStructure"]

MarginControl --> DeliveryCostPerUnit["SupplyLayer3_DeliveryCostPerUnit"]
MarginControl --> PriceCostAlignment["SupplyLayer3_PriceCostAlignment"]

ChurnEconomics --> CohortRetentionShape["SupplyLayer3_CohortRetentionShape"]
ChurnEconomics --> NetRevenueRetention["SupplyLayer3_NetRevenueRetention"]

CashFlowStress --> FulfillmentCashLag["SupplyLayer3_FulfillmentCashLag"]
CashFlowStress --> PaybackDrag["SupplyLayer3_PaybackDrag"]

UtilizationBalance --> CapacityBuffer["SupplyLayer4_CapacityBuffer"]
UtilizationBalance --> BottleneckRoleLoad["SupplyLayer4_BottleneckRoleLoad"]
SkillCoverage --> TrainingDebt["SupplyLayer4_TrainingDebt"]
SkillCoverage --> DependencyRisk["SupplyLayer4_KeyPersonDependency"]

CycleTime --> QueueBacklog["SupplyLayer4_QueueBacklog"]
CycleTime --> SchedulingDiscipline["SupplyLayer4_SchedulingDiscipline"]
ReworkRate --> RequirementClarity["SupplyLayer4_RequirementClarity"]
ReworkRate --> HandoffQuality["SupplyLayer4_HandoffQuality"]
QaConsistency --> QaChecklistUse["SupplyLayer4_QaChecklistUse"]
QaConsistency --> DefectEscapeRate["SupplyLayer4_DefectEscapeRate"]

ManualHandoffCount --> AutomationGap["SupplyLayer4_AutomationGap"]
DataVisibility --> MetricLatency["SupplyLayer4_MetricLatency"]

TimeToFirstValue --> OnboardingStepFriction["SupplyLayer4_OnboardingStepFriction"]
ActivationCompletion --> ActivationDropPoint["SupplyLayer4_ActivationDropPoint"]

MilestoneAttainment --> SuccessPlanSpecificity["SupplyLayer4_SuccessPlanSpecificity"]
CustomerEffortScore --> SupportBurden["SupplyLayer4_SupportBurden"]

UsageFrequency --> InactiveSegmentSize["SupplyLayer4_InactiveSegmentSize"]
SaveFlowStrength --> CancellationSaveRate["SupplyLayer4_CancellationSaveRate"]
CommunityStickiness --> PeerInteractionRate["SupplyLayer4_PeerInteractionRate"]

UpsellFit --> NextProblemMatch["SupplyLayer4_NextProblemMatch"]
CrossSellFit --> JourneyAdjacency["SupplyLayer4_JourneyAdjacency"]
DownsellRecovery --> SalvageRate["SupplyLayer4_SalvageRate"]
ContinuityStructure --> ContinuityValueClarity["SupplyLayer4_ContinuityValueClarity"]

DeliveryCostPerUnit --> LaborToRevenueRatio["SupplyLayer4_LaborToRevenueRatio"]
PriceCostAlignment --> ContributionMarginTrend["SupplyLayer4_ContributionMarginTrend"]

CohortRetentionShape --> EarlyChurnSpike["SupplyLayer4_EarlyChurnSpike"]
NetRevenueRetention --> ExpansionMinusContraction["SupplyLayer4_ExpansionMinusContraction"]

FulfillmentCashLag --> UpfrontCashCoverage["SupplyLayer4_UpfrontCashCoverage"]
PaybackDrag --> RecoveryDays["SupplyLayer4_RecoveryDays"]

CapacityBuffer --> SupplyRootA1["SupplyLayer5_RootCause_NoCapacitySlack"]
BottleneckRoleLoad --> SupplyRootA2["SupplyLayer5_RootCause_CriticalRoleOverload"]
TrainingDebt --> SupplyRootA3["SupplyLayer5_RootCause_InsufficientCapabilityBuild"]
DependencyRisk --> SupplyRootA4["SupplyLayer5_RootCause_KeyPersonFragility"]
QueueBacklog --> SupplyRootB1["SupplyLayer5_RootCause_QueueManagementFailure"]
SchedulingDiscipline --> SupplyRootB2["SupplyLayer5_RootCause_SchedulingInstability"]
RequirementClarity --> SupplyRootB3["SupplyLayer5_RootCause_UnclearIntake"]
HandoffQuality --> SupplyRootB4["SupplyLayer5_RootCause_CrossTeamMisalignment"]
QaChecklistUse --> SupplyRootB5["SupplyLayer5_RootCause_NoQualitySystem"]
DefectEscapeRate --> SupplyRootB6["SupplyLayer5_RootCause_LateDefectDetection"]
AutomationGap --> SupplyRootC1["SupplyLayer5_RootCause_ManualOpsOverload"]
MetricLatency --> SupplyRootC2["SupplyLayer5_RootCause_BlindOpsMetrics"]
OnboardingStepFriction --> SupplyRootD1["SupplyLayer5_RootCause_OnboardingFriction"]
ActivationDropPoint --> SupplyRootD2["SupplyLayer5_RootCause_ActivationLeak"]
SuccessPlanSpecificity --> SupplyRootD3["SupplyLayer5_RootCause_NoSuccessRoadmap"]
SupportBurden --> SupplyRootD4["SupplyLayer5_RootCause_CustomerEffortTooHigh"]
InactiveSegmentSize --> SupplyRootE1["SupplyLayer5_RootCause_UsageChurnRisk"]
CancellationSaveRate --> SupplyRootE2["SupplyLayer5_RootCause_WeakSaveProcess"]
PeerInteractionRate --> SupplyRootE3["SupplyLayer5_RootCause_CommunityUnderdeveloped"]
NextProblemMatch --> SupplyRootF1["SupplyLayer5_RootCause_UpsellNotProblemLed"]
JourneyAdjacency --> SupplyRootF2["SupplyLayer5_RootCause_CrossSellNotAdjacent"]
SalvageRate --> SupplyRootF3["SupplyLayer5_RootCause_DownsellMissing"]
ContinuityValueClarity --> SupplyRootF4["SupplyLayer5_RootCause_ContinuityLowPerceivedValue"]
LaborToRevenueRatio --> SupplyRootG1["SupplyLayer5_RootCause_DeliveryCostTooHigh"]
ContributionMarginTrend --> SupplyRootG2["SupplyLayer5_RootCause_PriceCostMismatch"]
EarlyChurnSpike --> SupplyRootG3["SupplyLayer5_RootCause_OnboardingDrivenChurn"]
ExpansionMinusContraction --> SupplyRootG4["SupplyLayer5_RootCause_NrrErosion"]
UpfrontCashCoverage --> SupplyRootG5["SupplyLayer5_RootCause_InsufficientUpfrontCash"]
RecoveryDays --> SupplyRootG6["SupplyLayer5_RootCause_PaybackLagSupplySide"]

SupplyRootA1 --> SupplyActionA1["SupplyLayer6_Action_AddCapacityBufferPolicy"]
SupplyRootA2 --> SupplyActionA2["SupplyLayer6_Action_RebalanceCriticalWorkloads"]
SupplyRootA3 --> SupplyActionA3["SupplyLayer6_Action_InstallTrainingCadence"]
SupplyRootA4 --> SupplyActionA4["SupplyLayer6_Action_ReduceKeyPersonRisk"]
SupplyRootB1 --> SupplyActionB1["SupplyLayer6_Action_QueuePrioritizationRules"]
SupplyRootB2 --> SupplyActionB2["SupplyLayer6_Action_StabilizeScheduling"]
SupplyRootB3 --> SupplyActionB3["SupplyLayer6_Action_StandardizeIntakeBriefs"]
SupplyRootB4 --> SupplyActionB4["SupplyLayer6_Action_HandoffProtocols"]
SupplyRootB5 --> SupplyActionB5["SupplyLayer6_Action_AdoptQualityChecklist"]
SupplyRootB6 --> SupplyActionB6["SupplyLayer6_Action_MoveQaEarlier"]
SupplyRootC1 --> SupplyActionC1["SupplyLayer6_Action_AutomateRepeatingTasks"]
SupplyRootC2 --> SupplyActionC2["SupplyLayer6_Action_CreateRealTimeOpsDashboard"]
SupplyRootD1 --> SupplyActionD1["SupplyLayer6_Action_ReduceOnboardingSteps"]
SupplyRootD2 --> SupplyActionD2["SupplyLayer6_Action_FixActivationDropPoint"]
SupplyRootD3 --> SupplyActionD3["SupplyLayer6_Action_BuildMilestoneSuccessPlans"]
SupplyRootD4 --> SupplyActionD4["SupplyLayer6_Action_LowerCustomerEffort"]
SupplyRootE1 --> SupplyActionE1["SupplyLayer6_Action_ReactivationCadence"]
SupplyRootE2 --> SupplyActionE2["SupplyLayer6_Action_RetentionSaveScripts"]
SupplyRootE3 --> SupplyActionE3["SupplyLayer6_Action_CommunityEngagementLoops"]
SupplyRootF1 --> SupplyActionF1["SupplyLayer6_Action_DesignNextProblemUpsell"]
SupplyRootF2 --> SupplyActionF2["SupplyLayer6_Action_MapAdjacentCrossSellOffers"]
SupplyRootF3 --> SupplyActionF3["SupplyLayer6_Action_InstallDownsellPaths"]
SupplyRootF4 --> SupplyActionF4["SupplyLayer6_Action_RepackageContinuityValue"]
SupplyRootG1 --> SupplyActionG1["SupplyLayer6_Action_ReduceDeliveryCostDrivers"]
SupplyRootG2 --> SupplyActionG2["SupplyLayer6_Action_RepriceOrRescopeDelivery"]
SupplyRootG3 --> SupplyActionG3["SupplyLayer6_Action_OnboardingChurnIntervention"]
SupplyRootG4 --> SupplyActionG4["SupplyLayer6_Action_IncreaseExpansionVelocity"]
SupplyRootG5 --> SupplyActionG5["SupplyLayer6_Action_IncreaseUpfrontCollections"]
SupplyRootG6 --> SupplyActionG6["SupplyLayer6_Action_CompressFulfillmentRecoveryWindow"]

SupplyActionA1 --> SupplyMetricA1["SupplyLayer7_MetricGate_UtilizationBelowThreshold"]
SupplyActionA2 --> SupplyMetricA2["SupplyLayer7_MetricGate_RoleLoadBalanceIndex"]
SupplyActionA3 --> SupplyMetricA3["SupplyLayer7_MetricGate_TrainingCompletionRate"]
SupplyActionA4 --> SupplyMetricA4["SupplyLayer7_MetricGate_KeyRoleRedundancy"]
SupplyActionB1 --> SupplyMetricB1["SupplyLayer7_MetricGate_BacklogDays"]
SupplyActionB2 --> SupplyMetricB2["SupplyLayer7_MetricGate_ScheduleVariance"]
SupplyActionB3 --> SupplyMetricB3["SupplyLayer7_MetricGate_IntakeReworkRate"]
SupplyActionB4 --> SupplyMetricB4["SupplyLayer7_MetricGate_HandoffErrorRate"]
SupplyActionB5 --> SupplyMetricB5["SupplyLayer7_MetricGate_ChecklistAdherence"]
SupplyActionB6 --> SupplyMetricB6["SupplyLayer7_MetricGate_DefectsFoundPreDelivery"]
SupplyActionC1 --> SupplyMetricC1["SupplyLayer7_MetricGate_ManualTaskShare"]
SupplyActionC2 --> SupplyMetricC2["SupplyLayer7_MetricGate_MetricUpdateLag"]
SupplyActionD1 --> SupplyMetricD1["SupplyLayer7_MetricGate_OnboardingCompletionTime"]
SupplyActionD2 --> SupplyMetricD2["SupplyLayer7_MetricGate_ActivationRate"]
SupplyActionD3 --> SupplyMetricD3["SupplyLayer7_MetricGate_MilestoneCompletionRate"]
SupplyActionD4 --> SupplyMetricD4["SupplyLayer7_MetricGate_CustomerEffortTrend"]
SupplyActionE1 --> SupplyMetricE1["SupplyLayer7_MetricGate_ReactivationRate"]
SupplyActionE2 --> SupplyMetricE2["SupplyLayer7_MetricGate_CancellationSaveRate"]
SupplyActionE3 --> SupplyMetricE3["SupplyLayer7_MetricGate_CommunityParticipationRate"]
SupplyActionF1 --> SupplyMetricF1["SupplyLayer7_MetricGate_UpsellTakeRate"]
SupplyActionF2 --> SupplyMetricF2["SupplyLayer7_MetricGate_CrossSellAttachRate"]
SupplyActionF3 --> SupplyMetricF3["SupplyLayer7_MetricGate_DownsellRecoveryRate"]
SupplyActionF4 --> SupplyMetricF4["SupplyLayer7_MetricGate_ContinuityRenewalRate"]
SupplyActionG1 --> SupplyMetricG1["SupplyLayer7_MetricGate_DeliveryCostPerUnitTrend"]
SupplyActionG2 --> SupplyMetricG2["SupplyLayer7_MetricGate_ContributionMarginTrend"]
SupplyActionG3 --> SupplyMetricG3["SupplyLayer7_MetricGate_EarlyMonthChurnRate"]
SupplyActionG4 --> SupplyMetricG4["SupplyLayer7_MetricGate_NetRevenueRetention"]
SupplyActionG5 --> SupplyMetricG5["SupplyLayer7_MetricGate_UpfrontCashCoverageRatio"]
SupplyActionG6 --> SupplyMetricG6["SupplyLayer7_MetricGate_RecoveryDaysTrend"]

SupplyMetricA1 --> SupplyResolved["SupplyLayer8_ConstraintResolvedOrEscalate"]
SupplyMetricA2 --> SupplyResolved
SupplyMetricA3 --> SupplyResolved
SupplyMetricA4 --> SupplyResolved
SupplyMetricB1 --> SupplyResolved
SupplyMetricB2 --> SupplyResolved
SupplyMetricB3 --> SupplyResolved
SupplyMetricB4 --> SupplyResolved
SupplyMetricB5 --> SupplyResolved
SupplyMetricB6 --> SupplyResolved
SupplyMetricC1 --> SupplyResolved
SupplyMetricC2 --> SupplyResolved
SupplyMetricD1 --> SupplyResolved
SupplyMetricD2 --> SupplyResolved
SupplyMetricD3 --> SupplyResolved
SupplyMetricD4 --> SupplyResolved
SupplyMetricE1 --> SupplyResolved
SupplyMetricE2 --> SupplyResolved
SupplyMetricE3 --> SupplyResolved
SupplyMetricF1 --> SupplyResolved
SupplyMetricF2 --> SupplyResolved
SupplyMetricF3 --> SupplyResolved
SupplyMetricF4 --> SupplyResolved
SupplyMetricG1 --> SupplyResolved
SupplyMetricG2 --> SupplyResolved
SupplyMetricG3 --> SupplyResolved
SupplyMetricG4 --> SupplyResolved
SupplyMetricG5 --> SupplyResolved
SupplyMetricG6 --> SupplyResolved
```

## Metric Guide For Fast Triage

- `SpeedToLead`: under 60 seconds is ideal, over 5 minutes is a severe leak.
- `ShowRate` and `CloseRate`: separate diagnosis, never blend into one metric.
- `CAC` to `LTGP`: if economics break while conversion is decent, it is often business model design, not ad creative.
- `PaybackDays`: slower payback means growth throttles even if demand exists.
- `TimeToFirstValue` and `ActivationRate`: leading indicators for churn and retention.
- `NetRevenueRetention`: fastest indicator of whether supply side value compounding is healthy.

