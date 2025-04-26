import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Resource } from "../../../schema"
import { formatPrice, formatResourceDate } from "@/lib/utils"

interface RecentResourcesProps {
  resources: Resource[]
}

export function RecentResources({ resources }: RecentResourcesProps) {
  return (
    <div className="space-y-8">
      {resources.map((resource) => (
        <div className="flex items-center" key={resource.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{resource.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{resource.name}</p>
            <p className="text-sm text-muted-foreground">{formatResourceDate(resource.start_date)}</p>
          </div>
          <div className="ml-auto font-medium">{formatPrice(resource.price, "ARS")}</div>
        </div>
      ))}
    </div>
  )
}
